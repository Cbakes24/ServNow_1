# 🗭 ServNow Mobile App

A React Native mobile application built with **Expo Router** for service booking and contractor management.

## 🏗️ Project Structure

```
app/                    # Screens and navigation routes
├── (tabs)/            # Customer bottom tab layout
│   ├── _layout.tsx    # Customer tab navigation
│   ├── index.tsx      # Customer home screen
│   ├── explore.tsx    # Services browsing screen
│   └── profile.tsx    # Customer profile screen
├── (contractor)/      # Contractor-specific flow
│   ├── _layout.tsx    # Contractor tab navigation
│   ├── index.tsx      # Contractor home dashboard
│   └── jobs.tsx       # Assigned jobs management
├── auth/              # Authentication screens
│   ├── _layout.tsx    # Auth navigation
│   ├── login.tsx      # Login screen
│   └── signup.tsx     # Signup screen
├── _layout.tsx        # Global navigation wrapper
└── +not-found.tsx     # 404 screen

components/            # Shared UI components
├── ui/                # UI components
├── Collapsible.tsx    # Collapsible component
├── ExternalLink.tsx   # External link component
├── HapticTab.tsx      # Haptic feedback tab
├── HelloWave.tsx      # Animated wave component
├── ParallaxScrollView.tsx # Parallax scroll view
├── ThemedText.tsx     # Themed text component
└── ThemedView.tsx     # Themed view component

constants/             # Reusable values
└── Colors.ts          # Color definitions

hooks/                 # Custom hooks
├── useColorScheme.ts  # Color scheme hook
├── useColorScheme.web.ts # Web color scheme hook
└── useThemeColor.ts   # Theme color hook

assets/                # Images, fonts, icons
```

## 🚀 Features

### Customer Features
- **Home Dashboard**: Quick actions and service overview
- **Services Browser**: Browse and book professional services
- **Profile Management**: Account settings and preferences
- **Authentication**: Secure login and signup

### Contractor Features
- **Dashboard**: Job statistics and daily schedule
- **Job Management**: View and manage assigned jobs
- **Status Tracking**: Track job progress and completion

### Technical Features
- **Expo Router**: File-based routing (like Next.js)
- **TypeScript**: Full type safety
- **Modern UI**: Clean, responsive design
- **Dark Mode**: Light and dark theme support
- **Haptic Feedback**: Enhanced user experience

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or later)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd servnow-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

## 📱 Navigation Structure

### Customer Flow
- **Home** (`/`): Main dashboard with quick actions
- **Services** (`/services`): Browse available services
- **Profile** (`/profile`): Account and settings

### Contractor Flow
- **Dashboard** (`/contractor`): Job overview and stats
- **Jobs** (`/contractor/jobs`): Manage assigned jobs

### Authentication
- **Login** (`/auth/login`): Sign in to account
- **Signup** (`/auth/signup`): Create new account

## 🎨 Design System

The app uses a consistent design system with:
- **Colors**: Defined in `constants/Colors.ts`
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized padding and margins
- **Components**: Reusable UI components

## 🔧 Development

### Adding New Screens
1. Create a new file in the appropriate directory under `app/`
2. Export a default React component
3. The route will be automatically available based on the file path

### Adding New Components
1. Create components in the `components/` directory
2. Use TypeScript for type safety
3. Follow the existing component patterns

### Styling
- Use StyleSheet for component-specific styles
- Follow the existing color scheme
- Maintain consistency with the design system

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Built with ❤️ using Expo Router**
