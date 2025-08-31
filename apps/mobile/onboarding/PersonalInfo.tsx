import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Modal } from "react-native";

interface PersonalInfoProps {
  onNext: (personalInfo: {
    fullName: string;
    username: string;
    dateOfBirth: string;
  }) => void;
  onBack?: () => void;
}

export default function PersonalInfo({ onNext, onBack }: PersonalInfoProps) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const handleNext = () => {
    onNext({ 
      fullName: fullName || "John Doe", 
      username: username || "johndoe", 
      dateOfBirth: dateOfBirth || "01/01/1990" 
    }); // Default for testing
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
    setCalendarDate(selectedDate);
    setSelectedDay(selectedDate.getDate());
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
    setSelectedDay(null);
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  const handleConfirm = () => {
    if (selectedDay) {
      const newDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), selectedDay);
      const formattedDate = `${String(newDate.getMonth() + 1).padStart(2, '0')}/${String(newDate.getDate()).padStart(2, '0')}/${newDate.getFullYear()}`;
      setDateOfBirth(formattedDate);
      setSelectedDate(newDate);
    }
    hideDatePicker();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(calendarDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCalendarDate(newDate);
  };

  const formatDisplayDate = () => {
    if (dateOfBirth) {
      return dateOfBirth;
    }
    return "MM/DD/YYYY";
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long' });
  };

  const getYear = (date: Date) => {
    return date.getFullYear();
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(calendarDate);
    newDate.setFullYear(year);
    setCalendarDate(newDate);
    setShowYearPicker(false);
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(monthIndex);
    setCalendarDate(newDate);
    setShowMonthPicker(false);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    const endYear = currentYear;
    const years = [];
    for (let year = endYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forwardButton} onPress={handleNext}>
            <Text style={styles.forwardArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Title and Description */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Add your personal info</Text>
          <Text style={styles.subtitle}>
            This info needs to be accurate with your ID document.
          </Text>
        </View>

        {/* Personal Info Inputs */}
        <ScrollView style={styles.inputSection} showsVerticalScrollIndicator={false}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Mr. Jhon Doe"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={fullName}
              onChangeText={setFullName}
              autoFocus
            />
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Username</Text>
            <View style={styles.usernameContainer}>
              <Text style={styles.usernamePrefix}>@</Text>
              <TextInput
                style={styles.usernameInput}
                placeholder="username"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Date of Birth</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={showDatePickerModal}
            >
              <Text style={[styles.dateText, !dateOfBirth && styles.placeholderText]}>
                {formatDisplayDate()}
              </Text>
              <Text style={styles.calendarIcon}>📅</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleNext}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Date Picker Modal */}
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={hideDatePicker}
        >
          <View style={styles.modalContainer}>
            <View style={styles.calendarContainer}>
              {/* Calendar Header */}
              <View style={styles.calendarHeader}>
                <TouchableOpacity 
                  style={styles.navButton}
                  onPress={() => navigateMonth('prev')}
                >
                  <Text style={styles.navButtonText}>‹</Text>
                </TouchableOpacity>
                
                <View style={styles.monthYearContainer}>
                  <TouchableOpacity onPress={() => setShowMonthPicker(true)}>
                    <Text style={styles.monthYearText}>{getMonthName(calendarDate)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowYearPicker(true)}>
                    <Text style={styles.monthYearText}>{getYear(calendarDate)}</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  style={styles.navButton}
                  onPress={() => navigateMonth('next')}
                >
                  <Text style={styles.navButtonText}>›</Text>
                </TouchableOpacity>
              </View>

              {/* Day Headers */}
              <View style={styles.dayHeaders}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <Text key={day} style={styles.dayHeaderText}>{day}</Text>
                ))}
              </View>

              {/* Calendar Grid */}
              <View style={styles.calendarGrid}>
                {getDaysInMonth(calendarDate).map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayCell,
                      day === selectedDay && styles.selectedDayCell,
                      !day && styles.emptyDayCell
                    ]}
                    onPress={() => day && handleDaySelect(day)}
                    disabled={!day}
                  >
                    {day && (
                      <Text style={[
                        styles.dayText,
                        day === selectedDay && styles.selectedDayText
                      ]}>
                        {day}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Confirm Button */}
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>

              {/* Year Picker */}
              {showYearPicker && (
                <View style={styles.pickerOverlay}>
                  <View style={styles.pickerContainer}>
                    <Text style={styles.pickerTitle}>Select Year</Text>
                    <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
                      {getYearRange().map(year => (
                        <TouchableOpacity
                          key={year}
                          style={styles.pickerOption}
                          onPress={() => handleYearSelect(year)}
                        >
                          <Text style={styles.pickerOptionText}>{year}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <TouchableOpacity 
                      style={styles.pickerCloseButton}
                      onPress={() => setShowYearPicker(false)}
                    >
                      <Text style={styles.pickerCloseText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Month Picker */}
              {showMonthPicker && (
                <View style={styles.pickerOverlay}>
                  <View style={styles.pickerContainer}>
                    <Text style={styles.pickerTitle}>Select Month</Text>
                    <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
                      {months.map((month, index) => (
                        <TouchableOpacity
                          key={month}
                          style={styles.pickerOption}
                          onPress={() => handleMonthSelect(index)}
                        >
                          <Text style={styles.pickerOptionText}>{month}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <TouchableOpacity 
                      style={styles.pickerCloseButton}
                      onPress={() => setShowMonthPicker(false)}
                    >
                      <Text style={styles.pickerCloseText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: {
    fontSize: 28,
    color: "white",
    fontWeight: "300",
  },
  forwardButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  forwardArrow: {
    fontSize: 28,
    color: "white",
    fontWeight: "300",
  },
  titleSection: {
    alignItems: "flex-start",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 22,
  },
  inputSection: {
    flex: 1,
    paddingTop: 20,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "white",
    fontWeight: "400",
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  usernamePrefix: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    marginRight: 4,
    fontWeight: "500",
  },
  usernameInput: {
    flex: 1,
    fontSize: 16,
    color: "white",
    fontWeight: "400",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  dateText: {
    fontSize: 16,
    color: "white",
    fontWeight: "400",
  },
  placeholderText: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  calendarIcon: {
    fontSize: 18,
  },
  buttonSection: {
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    backgroundColor: "black",
    borderRadius: 12,
    padding: 16,
    width: "75%",
    maxHeight: "55%",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  navButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "300",
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  dayHeaders: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayHeaderText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
    width: 32,
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  dayCell: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 1,
  },
  selectedDayCell: {
    backgroundColor: "white",
    borderRadius: 16,
  },
  emptyDayCell: {
    backgroundColor: "transparent",
  },
  dayText: {
    fontSize: 14,
    color: "white",
  },
  selectedDayText: {
    color: "black",
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
  monthYearContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    maxHeight: "60%",
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  pickerScroll: {
    maxHeight: 200,
  },
  pickerOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  pickerOptionText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  pickerCloseButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 12,
    alignItems: "center",
  },
  pickerCloseText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
}); 