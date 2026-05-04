# Subscription Manager App 👋

A premium, state-of-the-art React Native application built with Expo to help you track and manage your digital subscriptions with ease.

## ✨ Features

-   **Dashboard Overview**: View your total balance and upcoming renewals at a glance.
-   **Searchable Subscription List**: Quickly find any subscription by name, category, or plan.
-   **Add New Subscriptions**: Easy-to-use modal interface to add new subscriptions with automatic renewal date calculation.
-   **Expandable Details**: View detailed information about each subscription, including payment methods and billing cycles.
-   **Secure Authentication**: Fully integrated with Clerk for secure user sign-up and sign-in.
-   **Premium UI/UX**: Built with a custom design system using Nativewind (Tailwind CSS), featuring sleek animations and a modern aesthetic.

## 🚀 Tech Stack

-   **Framework**: [Expo](https://expo.dev) / [React Native](https://reactnative.dev/)
-   **Styling**: [Nativewind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
-   **Authentication**: [Clerk](https://clerk.com/)
-   **Date Management**: [Day.js](https://day.js.org/)
-   **Routing**: [Expo Router](https://docs.expo.dev/router/introduction)

## 🛠️ Get Started

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Set up environment variables**
    Create a `.env` file in the root directory and add your keys (see `.env.example`):
    ```env
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
    EXPO_PUBLIC_POSTHOG_KEY=your_posthog_key
    EXPO_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
    ```

3.  **Start the app**
    ```bash
    npx expo start
    ```

## 📱 Platform Support

-   [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
-   [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
-   [Expo Go](https://expo.dev/go)

## 📂 Project Structure

-   `app/`: File-based routing and screen layouts.
-   `components/`: Reusable UI components (Modals, Cards, Headings).
-   `constants/`: App theme, dummy data, and icon assets.
-   `lib/`: Utility functions for formatting and logic.
-   `assets/`: Images and icon files.

---

Built using Expo and Nativewind.
