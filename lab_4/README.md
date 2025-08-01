# Student Feedback Collection System

A modern, responsive web-based feedback system designed for collecting student feedback after guest lectures. Built with HTML5, CSS3 (Tailwind CSS), and vanilla JavaScript.

## Features

### 📝 Feedback Form
- **Full Name**: Text input with validation
- **Email**: Email input with format validation
- **Department**: Dropdown selection with common engineering departments
- **Rating**: 1-5 star rating system using radio buttons
- **Comments**: Text area with real-time character count
- **Submit Button**: Processes and stores feedback

### 🎯 JavaScript Functionality
- **JavaScript Objects**: Each feedback submission is stored as a JavaScript object
- **Local Storage**: All feedbacks are persisted in browser's local storage
- **Session Storage**: "Welcome Back" message for returning users during the same session
- **Event Listeners**: Form submission, rating selection, and character counting
- **Real-time Updates**: Character count updates as user types
- **Data Management**: Clear all feedbacks functionality

### 🎨 UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Tailwind CSS Cards**: Beautiful card-based layout for displaying feedbacks
- **Star Rating Display**: Visual star representation of ratings
- **Notifications**: Success/error messages with smooth animations
- **Modern Styling**: Clean, professional interface with hover effects

## File Structure

```
student-feedback-system/
├── index.html          # Main HTML file with form and layout
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## How to Use

1. **Open the Application**: Open `index.html` in a modern web browser
2. **Submit Feedback**: Fill out the form with your details and submit
3. **View Feedbacks**: All submitted feedbacks are displayed below the form
4. **Manage Data**: Use the "Clear All Feedbacks" button to remove all data

## Technical Implementation

### Data Storage
- **Local Storage**: Feedbacks are stored as JSON strings in `localStorage`
- **Session Storage**: Tracks if user has visited during current session
- **Data Structure**: Each feedback object contains:
  ```javascript
  {
    id: timestamp,
    fullName: string,
    email: string,
    department: string,
    rating: number (1-5),
    comments: string,
    timestamp: string
  }
  ```

### Form Validation
- **Email Validation**: Regex pattern for email format validation
- **Required Fields**: All mandatory fields are validated before submission
- **Real-time Feedback**: Character count and visual indicators

### Event Handling
- **Form Submission**: Prevents default, validates data, stores in localStorage
- **Character Counting**: Updates count and color based on text length
- **Rating Selection**: Logs rating changes for potential future enhancements
- **Data Management**: Individual and bulk deletion with confirmation

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Features in Detail

### Welcome Message
- Uses session storage to detect returning users
- Shows a green notification message
- Automatically disappears after 5 seconds

### Character Count
- Real-time counting in comments textarea
- Color coding:
  - Gray: 0-300 characters
  - Yellow: 301-500 characters
  - Red: 500+ characters

### Star Rating System
- Visual star representation (★ for filled, ☆ for empty)
- Rating labels: Poor, Fair, Good, Very Good, Excellent
- Hover effects and smooth transitions

### Data Persistence
- All data survives browser refresh
- Data persists until manually cleared
- No server required - completely client-side

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly interface elements

## Future Enhancements

The system is designed to be easily extensible. Potential additions include:

- **Export/Import**: JSON data export and import functionality
- **Statistics**: Average ratings, department breakdowns
- **Search/Filter**: Find specific feedbacks
- **Charts**: Visual representation of feedback data
- **Backend Integration**: Server-side storage and processing

## Getting Started

1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start collecting feedback!

No build process or dependencies required - it's ready to use immediately.

## License

This project is open source and available under the MIT License. 
