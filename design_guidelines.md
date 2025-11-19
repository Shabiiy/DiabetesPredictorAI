# Diabetes Prediction Web App - Design Guidelines

## Design Approach
**Selected System:** Material Design with Healthcare App Principles
- Drawing inspiration from Apple Health, MyFitnessPal, and medical dashboards
- Emphasis on clarity, trust, and data comprehension
- Clean, professional aesthetic appropriate for health technology

## Typography
**Font Stack:** 
- Primary: Inter (Google Fonts) - body text, forms, data
- Secondary: Poppins (Google Fonts) - headings, emphasis
- Monospace: JetBrains Mono - numeric health data, metrics

**Hierarchy:**
- Hero Headlines: text-5xl md:text-6xl, font-bold (Poppins)
- Section Headers: text-3xl md:text-4xl, font-semibold (Poppins)
- Card Titles: text-xl font-semibold (Poppins)
- Body Text: text-base leading-relaxed (Inter)
- Metric Values: text-2xl md:text-3xl font-mono font-bold
- Labels/Captions: text-sm text-gray-600

## Layout System
**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16
- Component padding: p-6 or p-8
- Section spacing: py-12 md:py-16
- Card gaps: gap-6 or gap-8
- Form field spacing: space-y-6

**Grid System:**
- Container: max-w-7xl mx-auto px-4
- Dashboard cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Form layout: max-w-4xl single column with grouped sections
- Results view: Two-column (lg:grid-cols-2) - chart + insights

## Component Library

### Navigation
- Fixed header with logo left, navigation center, user profile/CTA right
- Transparent on landing, solid background on scroll
- Mobile: Hamburger menu with slide-out drawer

### Prediction Form
- Multi-section form with progress indicator at top
- Grouped inputs: Personal Info, Vital Metrics, Lifestyle Factors, Medical History
- Each input includes: label, input field, unit indicator (mg/dL, kg/m², etc.), normal range helper text
- Range sliders for continuous values with numeric input option
- Toggle switches for binary choices (family history, smoking status)
- Large "Analyze Risk" button at bottom: w-full md:w-auto px-12 py-4

### Dashboard Cards
- Elevated cards with rounded-2xl borders
- Icon + title + metric value + trend indicator layout
- Card structure: p-6, flex flex-col, gap-4
- Micro-statistics: Recent predictions count, average risk score, last check date

### Results Display
- Hero metric: Large circular progress indicator showing risk percentage
- Risk category badge: rounded-full px-6 py-2 with appropriate semantic styling
- Contributing factors: Horizontal bar chart showing parameter impact
- Recommendations: Numbered list with icons, each item in rounded card
- Action buttons: "Save Report", "Track Progress", "Get Resources"

### Charts & Visualizations
- Use Chart.js for interactive graphs
- Health trends: Line chart showing risk score over time
- Parameter comparison: Radar chart comparing user values to healthy ranges
- Clean axis labels, grid lines, tooltips on hover

### Health Tools Section
- Three-column grid on desktop: BMI Calculator, Blood Sugar Interpreter, Symptom Checker
- Each tool in elevated card: icon, title, brief description, "Use Tool" button
- Tools open in modal overlays with focused interfaces

### Educational Resources
- Card-based layout with medical illustrations
- Categories: Understanding Diabetes, Prevention, Diet, Exercise, Monitoring
- Each resource card: image thumbnail, title, description snippet, "Learn More" link

## Images

**Hero Section:**
- Large hero image showing diverse people living healthy, active lifestyles (no clinical/hospital imagery)
- Image treatment: Subtle gradient overlay from bottom to ensure text readability
- Position: Full-width background, h-[600px] md:h-[700px]
- Overlay content: Centered, max-w-3xl with headline, subheadline, CTA buttons with backdrop-blur-md backgrounds

**Dashboard/Results:**
- No decorative images - focus on data visualization and charts
- Use icons from Heroicons (medical, chart, activity icons)

**Educational Resources:**
- Illustration-style images for each resource card (400x300px ratio)
- Friendly, non-threatening medical illustrations

**Additional:**
- Feature section: Three icon illustrations showing "Easy Input", "AI Analysis", "Actionable Insights"

## Animations
Minimal, purposeful motion:
- Form field focus: Subtle scale and border transition
- Card hover: Slight elevation increase (shadow transition)
- Chart entry: Smooth draw-in animation on initial load
- Results reveal: Stagger animation for recommendation cards (delay-[100ms] increments)

## Key Interactions
- Input validation: Real-time feedback with green checkmarks for valid, red warnings for out-of-range
- Range tooltips: Appear on hover showing "Normal: 70-100 mg/dL"
- Export button: Shows loading spinner, then success checkmark
- Prediction history: Expandable timeline with click to view details

## Accessibility
- All form inputs with proper labels and aria-describedby for helper text
- Color-blind safe visualizations (use patterns in addition to colors for charts)
- Keyboard navigation throughout entire application
- Screen reader announcements for prediction results

This design creates a trustworthy, professional healthcare application that balances sophisticated data presentation with approachable user experience.