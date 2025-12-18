# TPStreams React Native Player Sample App

A sample React Native application demonstrating the integration of TPStreams video player with download management and navigation.

**TPStreams SDK:** [react-native-tpstreams](https://www.npmjs.com/package/react-native-tpstreams)

## Prerequisites

- Node.js (v16 or higher)
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/testpress/sample-rn-player-app.git
cd SampleRNPlayerApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Platform-Specific Setup

#### iOS

```bash
cd ios
pod install
cd ..
```

#### Android

No additional setup required. The dependencies will be automatically linked.

## Running the App

### Android

```bash
npx react-native run-android
```

### iOS

```bash
npx react-native run-ios
```

Or open `ios/SampleRNPlayerApp.xcworkspace` in Xcode and run from there.


## Configuration

### 1. Initialize TPStreams SDK

First, initialize the TPStreams SDK with your Organization ID in `index.js`:

```javascript
import { TPStreams } from 'react-native-tpstreams';

// Replace 'YOUR_ORG_ID' with your actual TPStreams Organization ID
TPStreams.initialize('YOUR_ORG_ID');
```

**Example:**
```javascript
TPStreams.initialize('9q94nm');
```

### 2. Configure Your Videos

To use your own videos, update the video IDs and access tokens in `src/screens/HomeScreen.tsx`:

```tsx
navigation.navigate('Video', {
  videoId: 'YOUR_VIDEO_ID',
  accessToken: 'YOUR_ACCESS_TOKEN',
  title: 'Video Title'
});
```

**Example:**
```tsx
navigation.navigate('Video', {
  videoId: '42h2tZ5fmNf',
  accessToken: '9327e2d0-fa13-4288-902d-840f32cd0eed',
  title: 'DRM Video'
});
```
