<div align="center">
  <img src="https://cdn.discordapp.com/avatars/1526658888982855894/16dc88f73dc8296bbed8edc9455e871e.png?size=256" alt="Meowles-Bot Logo" width="150" height="150" />

  # Meowles-Bot

  A modular Discord bot template built with TypeScript and discord.js.

  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![discord.js](https://img.shields.io/badge/discord.js-5865F2?logo=discord&logoColor=white)](https://discord.js.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![License](https://img.shields.io/github/license/ethalth/Discord-Bot-Template)](LICENSE)

  [Explore the Repository](https://github.com/ethalth/Discord-Bot-Template) · [Report a Bug](https://github.com/ethalth/Discord-Bot-Template/issues) · [Request a Feature](https://github.com/ethalth/Discord-Bot-Template/issues)
</div>

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Repository](#repository)
- [Issues](#issues)
- [Continuous Integration](#continuous-integration)
- [Contributing](#contributing)
- [License](#license)

## About the Project

Meowles-Bot is a Discord bot template designed to provide a starting point for building Discord bots with TypeScript and discord.js.

The project uses a modular structure to organise commands, interactions, and event handlers, making it easier to extend and maintain.

## Features

- Prefix commands
- Slash commands
- Interaction handling
- Custom event handlers
- Modular command and event structure
- Environment-based configuration

## Built With

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![discord.js](https://img.shields.io/badge/discord.js-5865F2?logo=discord&logoColor=white)](https://discord.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![dotenv](https://img.shields.io/badge/dotenv-ECD53F?logo=dotenv&logoColor=black)](https://www.npmjs.com/package/dotenv)

## Getting Started

Follow these instructions to set up a local copy of the project.

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- A Discord application and bot token from the [Discord Developer Portal](https://discord.com/developers/applications)

## Installation

### 1. Clone the repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/ethalth/Discord-Bot-Template.git
```

### 2. Navigate to the project directory

Move into the newly cloned repository:

```bash
cd Discord-Bot-Template
```

### 3. Install dependencies

Install the packages required by the bot using npm:

```bash
npm install
```

### 4. Configure environment variables

Rename `.env.example` to `.env`. This file contains the environment variable template used to configure the bot.

```bash
mv .env.example .env
```

Open `.env` and fill in the required values, such as your Discord bot token and command prefix. Use the variable names provided in the file.

**Never share your bot token or commit your `.env` file to the repository.**

### 5. Build the project

Compile the TypeScript source code into JavaScript:

```bash
npm run build
```

### 6. Start the bot

Run the start script defined in `package.json` to launch the bot:

```bash
npm start
```