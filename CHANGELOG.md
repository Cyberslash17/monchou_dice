# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-07-05

### Updated

- **Dependencies**: Updated all dependencies to latest stable versions
  - React: 18.2.0 → 18.3.1
  - TypeScript: 4.9.3 → 5.8.3
  - Vite: 4.1.0 → 5.4.15
  - Material-UI: 5.11.x → 5.17.1
  - i18next: 22.4.12 → 25.3.1
  - react-i18next: 12.2.0 → 15.6.0
  - react-router-dom: 6.9.0 → 6.30.1
  - All @emotion packages to latest versions
  - Various dev dependencies and types

### Added

- Modern TypeScript configuration with stricter linting rules
- Node.js version specification (.nvmrc file)
- Engine requirements in package.json (Node >=18.0.0, npm >=9.0.0)
- Enhanced Vite configuration with build optimizations
- VS Code workspace configuration for better developer experience
- Prettier configuration for consistent code formatting
- GitHub Actions CI/CD workflow
- Comprehensive README.md with setup instructions
- Type checking npm scripts

### Fixed

- Removed unused imports and variables throughout the codebase
- Fixed TypeScript project references configuration
- Improved code organization and readability

### Changed

- Enhanced build configuration with source maps and modern targets
- Updated development server to use port 3000 with auto-open
- Improved project structure and maintainability
