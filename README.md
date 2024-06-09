<div align="center">
      <h1>Wory API</h1>
</div>

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Getting Started](#getting-started)
-   [Results](#results)
-   [Usage](#usage-notes)

## Prerequisites

-   **Node.js**: Ensure Node.js is installed on your system.
-   **npm (Node Package Manager)**: Required for installing dependencies.
-   **Add environment variable**: sample environment variable file is provide add

## Getting Started

1. Clone or download this repository to your local machine:

```bash
sudo https://github.com/Sakibdevlekar/wory-api.git
```

### **Create the .env File:**

-   Start by creating a new file named .env in the server directory of project.

-   Copy Sample Variables:
    Open the [⚙️ .env.sample](./.env.sample) file and copy its contents. These are sample environment variables that your application needs.

-   Paste into .env:
    Paste the copied variables into your .env file. These variables typically include sensitive information like database credentials, and other configurations.

-   Install the dependency's

```javascript
npm install
```

-   Run the script by entering the following command:

```javascript
npm run dev
```

## Results

Once the backend server is running, you can start using the API's features. To access the backend functionalities, you typically don't interact directly via a browser but through API endpoints using tools like Postman or through your frontend application's code.

### Usage Notes

-   For detailed information about available API endpoints, request formats, authentication requirements, and response structures, refer to the **[Wory Backend API Postman Collection](./Wory-API.postman_collection.json)** import this to postman.

-   Use this documentation to understand and integrate the backend API into your frontend application effectively.
