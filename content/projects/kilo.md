# Kilo — Gym Training App

Kilo is a personal Android app for planning and tracking gym workouts. I built it for my own training, so every feature started as something I actually wanted while lifting: no ads, no account, no subscription, and no data leaving the phone.

> **Status:** version 1.0 is built as an installable APK and is still being tested on a real device. The source code is in a private repository.

## What it does

- **Cycle-based training plans.** A workout is a sequence of training and rest days, and a *cycle* is one pass through that sequence — not tied to the calendar. Plans queue several workouts with a number of cycles each and switch automatically when one finishes.
- **Missed days handled honestly.** A skipped training day breaks the streak, and the app asks whether to skip it or shift the whole sequence. Rest days neither count nor break the streak, and a rest day can be brought forward when life gets in the way.
- **Fast workout logging.** Sets come pre-filled from the last session, a rest timer runs on scheduled notifications (so it works with the screen off), and an interrupted workout can be resumed or filled in afterwards. Supports warm-up, drop and failure sets, bi-sets, deload phases, exercise substitutes, a plate calculator and automatic personal records.
- **Progress and gamification.** Charts per exercise and per workout, plus weekly volume per muscle on an interactive front/back body map (secondary muscles count half). Streaks, streak freezes, XP, levels and badges are all derived from the workout history rather than stored.
- **Backup and AI-friendly import.** A full JSON backup restores inside a single transaction. Workouts can also be exported as JSON, edited with an AI assistant, and brought back; the app shows a diff of what will change before applying it, and keeps history and plan position intact.

## Engineering notes

- **Local-first.** Everything lives in an on-device SQLite database. Schema changes are append-only migrations, and backup and restore round-trips are covered by tests.
- **Business logic kept pure.** Plans, streaks, achievements, charts, plate math and set logic live in plain TypeScript modules with unit tests (Node's built-in test runner), separate from the UI.
- **Derived state over stored state.** Streaks and achievements are recomputed from history, so a rule change never leaves stale data behind.
- **Theming without hard-coded colors.** Every screen builds its styles from a palette, which gave dark and light themes plus selectable accent colors without per-screen work.
- **Self-built distribution.** The APK is built locally, with no store listing and no cloud build account.

## Stack

React Native 0.88 · Expo SDK 58 · Expo Router · TypeScript · expo-sqlite · react-native-svg · Reanimated
