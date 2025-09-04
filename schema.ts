import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Database Schema for Tangent Mobile App
 * 
 * This schema captures all data structures used in the mobile app including
 * user accounts, cards/wallets, transactions, settings, and onboarding flow.
 */
export default defineSchema({
  /**
   * Main users table storing all user information
   */
  users: defineTable({
    // ============ Account Credentials ============
    email: v.string(),
    password: v.string(), // Hashed
    emailVerified: v.boolean(),
    emailVerifiedAt: v.optional(v.number()),
    googleId: v.optional(v.string()), // For Google OAuth
    authProvider: v.union(
      v.literal("email"),
      v.literal("google"),
      v.literal("apple")
    ),
    
    // ============ Personal Information ============
    fullName: v.string(),
    username: v.string(), // Unique @username format
    dateOfBirth: v.string(), // Format: MM/DD/YYYY
    profileImage: v.optional(v.string()),
    
    // ============ Address Information ============
    street: v.string(),
    city: v.string(),
    state: v.optional(v.string()),
    zipCode: v.string(),
    country: v.string(),
    
    // ============ Contact Information ============
    phoneNumber: v.string(), // Formatted: +1 (555) 123-4567
    phoneCountryCode: v.string(), // e.g., "+1"
    phoneVerified: v.boolean(),
    phoneVerifiedAt: v.optional(v.number()),
    
    // ============ Security ============
    pin: v.string(), // 4-digit PIN (hashed)
    pinSetAt: v.optional(v.number()),
    biometricEnabled: v.boolean(),
    allowAccessWhenLocked: v.boolean(),
    
    // ============ KYC (Know Your Customer) ============
    kycStatus: v.union(
      v.literal("not_started"),
      v.literal("pending"),
      v.literal("in_review"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    kycSubmittedAt: v.optional(v.number()),
    kycApprovedAt: v.optional(v.number()),
    kycDocumentType: v.optional(v.string()),
    
    // ============ Onboarding Progress ============
    onboardingStatus: v.union(
      v.literal("not_started"),
      v.literal("in_progress"),
      v.literal("completed")
    ),
    onboardingCurrentStep: v.string(),
    onboardingCompletedSteps: v.array(v.string()),
    
    // ============ Account Settings ============
    notificationsEnabled: v.boolean(),
    marketingEmailsEnabled: v.boolean(),
    defaultWalletId: v.optional(v.id("wallets")),
    preferredLanguage: v.optional(v.string()),
    timezone: v.optional(v.string()),
    currency: v.optional(v.string()),
    
    // ============ Compliance ============
    termsAcceptedAt: v.optional(v.number()),
    privacyPolicyAcceptedAt: v.optional(v.number()),
    
    // ============ Metadata ============
    accountStatus: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("suspended"),
      v.literal("deleted")
    ),
    lastLoginAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_username", ["username"])
    .index("by_phone", ["phoneNumber"])
    .index("by_google_id", ["googleId"]),
  
  /**
   * User payment cards (virtual cards shown in the app)
   */
  cards: defineTable({
    userId: v.id("users"),
    name: v.string(), // Card holder name
    lastFour: v.string(), // Last 4 digits for display
    balance: v.string(), // Display balance (e.g., "$20900007")
    gradient: v.array(v.string()), // Gradient colors for card UI
    cardType: v.union(
      v.literal("mastercard"),
      v.literal("visa"),
      v.literal("amex")
    ),
    isDefault: v.boolean(),
    isActive: v.boolean(),
    expiryMonth: v.optional(v.number()),
    expiryYear: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_default", ["userId", "isDefault"]),
  
  /**
   * Crypto wallets connected to user accounts
   */
  wallets: defineTable({
    userId: v.id("users"),
    name: v.string(), // User-friendly name
    address: v.string(), // Wallet address (0x...)
    type: v.union(
      v.literal("MetaMask"),
      v.literal("WalletConnect"),
      v.literal("Coinbase"),
      v.literal("Trust Wallet"),
      v.literal("Phantom"),
      v.literal("Rainbow"),
      v.literal("Ledger")
    ),
    chainId: v.optional(v.number()),
    isDefault: v.boolean(),
    isActive: v.boolean(),
    balance: v.optional(v.string()),
    connectedAt: v.number(),
    lastUsedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_address", ["address"])
    .index("by_user_default", ["userId", "isDefault"]),
  
  /**
   * Transaction history
   */
  transactions: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("send"),
      v.literal("receive"),
      v.literal("swap"),
      v.literal("purchase"),
      v.literal("withdrawal")
    ),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    amount: v.string(),
    currency: v.string(),
    fromAddress: v.optional(v.string()),
    toAddress: v.optional(v.string()),
    cardId: v.optional(v.id("cards")),
    walletId: v.optional(v.id("wallets")),
    txHash: v.optional(v.string()),
    fee: v.optional(v.string()),
    note: v.optional(v.string()),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_status", ["userId", "status"])
    .index("by_tx_hash", ["txHash"]),
  
  /**
   * Verification codes for email, phone, and 2FA
   */
  verificationCodes: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("email"),
      v.literal("phone"),
      v.literal("password_reset"),
      v.literal("pin_reset")
    ),
    code: v.string(),
    expiresAt: v.number(),
    attemptCount: v.number(),
    used: v.boolean(),
    usedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_user_type", ["userId", "type"])
    .index("by_code", ["code"])
    .index("by_expiry", ["expiresAt"]),
  
  /**
   * User sessions for authentication
   */
  sessions: defineTable({
    userId: v.id("users"),
    sessionToken: v.string(),
    deviceId: v.optional(v.string()),
    deviceType: v.optional(v.string()), // ios, android
    deviceName: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
    expiresAt: v.number(),
    lastActivityAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_token", ["sessionToken"])
    .index("by_active", ["isActive"]),
  
  /**
   * Settings changes audit log
   */
  settingsAudit: defineTable({
    userId: v.id("users"),
    settingType: v.union(
      v.literal("pin_change"),
      v.literal("phone_change"),
      v.literal("address_change"),
      v.literal("wallet_added"),
      v.literal("wallet_removed"),
      v.literal("card_added"),
      v.literal("notification_change"),
      v.literal("account_deletion")
    ),
    oldValue: v.optional(v.any()),
    newValue: v.optional(v.any()),
    ipAddress: v.optional(v.string()),
    deviceId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_type", ["settingType"])
    .index("by_timestamp", ["createdAt"]),
  
  /**
   * Support tickets and feedback
   */
  supportTickets: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("issue"),
      v.literal("feedback"),
      v.literal("feature_request"),
      v.literal("account_help")
    ),
    subject: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("open"),
      v.literal("in_progress"),
      v.literal("resolved"),
      v.literal("closed")
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    ),
    assignedTo: v.optional(v.string()),
    resolvedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_priority", ["priority"]),
  
  /**
   * App version tracking for updates
   */
  appVersions: defineTable({
    userId: v.id("users"),
    platform: v.union(v.literal("ios"), v.literal("android")),
    version: v.string(), // e.g., "1.0.0"
    build: v.string(), // e.g., "2024.1.1"
    installedAt: v.number(),
    lastOpenedAt: v.number(),
    deviceModel: v.optional(v.string()),
    osVersion: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_platform", ["platform"])
    .index("by_version", ["version"]),
});