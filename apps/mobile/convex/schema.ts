import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Database Schema for Tangent Mobile App Onboarding
 * 
 * This schema captures all user data collected during the onboarding process
 * including personal information, verification status, KYC, and wallet details.
 */
export default defineSchema({
  /**
   * Main users table storing all user information
   */
  users: defineTable({
    // ============ Account Credentials ============
    email: v.string(),
    password: v.string(), // Will be hashed before storage
    emailVerified: v.boolean(),
    emailVerifiedAt: v.optional(v.number()),
    
    // ============ Personal Information ============
    fullName: v.string(),
    username: v.string(), // Unique identifier, @username format
    dateOfBirth: v.string(), // Format: MM/DD/YYYY
    
    // ============ Address Information ============
    addressLine: v.string(), // Street address
    city: v.string(),
    state: v.optional(v.string()),
    zipCode: v.string(),
    country: v.string(),
    
    // ============ Contact Information ============
    phoneNumber: v.string(), // Format: +1XXXXXXXXXX
    phoneCountryCode: v.string(), // e.g., "+1", "+44"
    phoneVerified: v.boolean(),
    phoneVerifiedAt: v.optional(v.number()),
    
    // ============ Security ============
    pin: v.optional(v.string()), // 4-6 digit PIN (hashed)
    pinSetAt: v.optional(v.number()),
    twoFactorEnabled: v.boolean(),
    
    // ============ KYC (Know Your Customer) ============
    kycStatus: v.union(
      v.literal("not_started"),
      v.literal("pending"),
      v.literal("in_review"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("expired")
    ),
    kycSubmittedAt: v.optional(v.number()),
    kycReviewedAt: v.optional(v.number()),
    kycApprovedAt: v.optional(v.number()),
    kycRejectedAt: v.optional(v.number()),
    kycRejectionReason: v.optional(v.string()),
    kycDocumentType: v.optional(v.string()), // e.g., "passport", "driver_license"
    kycVerificationId: v.optional(v.string()), // External KYC provider reference
    
    // ============ Wallet Information ============
    walletAddress: v.optional(v.string()), // Ethereum/crypto wallet address
    walletProvider: v.optional(v.string()), // e.g., "metamask", "walletconnect"
    walletConnectedAt: v.optional(v.number()),
    walletChainId: v.optional(v.number()), // Blockchain network ID
    
    // ============ Onboarding Progress ============
    onboardingStatus: v.union(
      v.literal("not_started"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("abandoned")
    ),
    onboardingCurrentStep: v.string(), // Current step in onboarding flow
    onboardingCompletedSteps: v.array(v.string()), // List of completed steps
    onboardingStartedAt: v.optional(v.number()),
    onboardingCompletedAt: v.optional(v.number()),
    
    // ============ Account Status ============
    accountStatus: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("suspended"),
      v.literal("deleted")
    ),
    lastLoginAt: v.optional(v.number()),
    loginCount: v.number(),
    
    // ============ Preferences ============
    preferredLanguage: v.optional(v.string()), // e.g., "en", "es"
    timezone: v.optional(v.string()), // e.g., "America/New_York"
    currency: v.optional(v.string()), // Preferred currency code
    notificationsEnabled: v.boolean(),
    marketingEmailsEnabled: v.boolean(),
    
    // ============ Compliance ============
    termsAcceptedAt: v.optional(v.number()),
    termsVersion: v.optional(v.string()),
    privacyPolicyAcceptedAt: v.optional(v.number()),
    privacyPolicyVersion: v.optional(v.string()),
    gdprConsentAt: v.optional(v.number()),
    
    // ============ Metadata ============
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()), // Soft delete
  })
    .index("by_email", ["email"])
    .index("by_username", ["username"])
    .index("by_phone", ["phoneNumber"])
    .index("by_wallet", ["walletAddress"])
    .index("by_kyc_status", ["kycStatus"])
    .index("by_onboarding_status", ["onboardingStatus"])
    .index("by_account_status", ["accountStatus"]),
  
  /**
   * Tracks individual steps completed during onboarding
   */
  onboardingSteps: defineTable({
    userId: v.id("users"),
    stepName: v.string(), // e.g., "email_verification", "personal_info", "phone_verification"
    stepOrder: v.number(), // Order in the flow
    status: v.union(
      v.literal("not_started"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("skipped")
    ),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    attemptCount: v.number(), // Number of attempts
    metadata: v.optional(v.any()), // Additional step-specific data
  })
    .index("by_user", ["userId"])
    .index("by_user_step", ["userId", "stepName"])
    .index("by_status", ["status"]),
  
  /**
   * Stores verification codes for email and phone
   */
  verificationCodes: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("email"),
      v.literal("phone"),
      v.literal("password_reset"),
      v.literal("two_factor")
    ),
    code: v.string(),
    hashedCode: v.optional(v.string()), // For secure storage
    expiresAt: v.number(),
    attemptCount: v.number(),
    maxAttempts: v.number(),
    used: v.boolean(),
    usedAt: v.optional(v.number()),
    createdAt: v.number(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  })
    .index("by_user_type", ["userId", "type"])
    .index("by_code", ["code"])
    .index("by_expiry", ["expiresAt"]),
  
  /**
   * KYC documents and verification records
   */
  kycDocuments: defineTable({
    userId: v.id("users"),
    documentType: v.union(
      v.literal("passport"),
      v.literal("driver_license"),
      v.literal("national_id"),
      v.literal("proof_of_address"),
      v.literal("selfie")
    ),
    documentUrl: v.optional(v.string()), // Secure storage URL
    documentHash: v.optional(v.string()), // For integrity verification
    verificationStatus: v.union(
      v.literal("pending"),
      v.literal("verified"),
      v.literal("rejected"),
      v.literal("expired")
    ),
    verifiedAt: v.optional(v.number()),
    rejectedAt: v.optional(v.number()),
    rejectionReason: v.optional(v.string()),
    expiryDate: v.optional(v.number()),
    metadata: v.optional(v.any()), // Provider-specific data
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_type", ["userId", "documentType"])
    .index("by_status", ["verificationStatus"]),
  
  /**
   * User sessions for tracking active logins
   */
  sessions: defineTable({
    userId: v.id("users"),
    sessionToken: v.string(),
    refreshToken: v.optional(v.string()),
    deviceId: v.optional(v.string()),
    deviceType: v.optional(v.string()), // e.g., "ios", "android", "web"
    deviceName: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    location: v.optional(v.object({
      country: v.string(),
      city: v.string(),
      latitude: v.number(),
      longitude: v.number(),
    })),
    isActive: v.boolean(),
    createdAt: v.number(),
    expiresAt: v.number(),
    lastActivityAt: v.number(),
    revokedAt: v.optional(v.number()),
    revokedReason: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_token", ["sessionToken"])
    .index("by_device", ["deviceId"])
    .index("by_active", ["isActive"])
    .index("by_expiry", ["expiresAt"]),
  
  /**
   * Audit log for tracking important user actions
   */
  auditLogs: defineTable({
    userId: v.id("users"),
    action: v.string(), // e.g., "login", "password_change", "kyc_submitted"
    category: v.string(), // e.g., "authentication", "profile", "security"
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    deviceId: v.optional(v.string()),
    metadata: v.optional(v.any()), // Additional context
    success: v.boolean(),
    errorMessage: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_action", ["action"])
    .index("by_category", ["category"])
    .index("by_timestamp", ["createdAt"]),
});