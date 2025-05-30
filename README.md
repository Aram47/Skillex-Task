# 🧩 Combination Generator API (Node.js + MySQL)

## 📋 Description

This project is a RESTful API built with **Node.js** and **MySQL** (without an ORM) that performs the following:

- Accepts a list of item types and a desired combination length.
- Generates all **valid combinations** where no two items share the same prefix (starting letter).
- Stores items and combinations in a MySQL database using **transactions** for data consistency.
- Returns a unique response ID and the list of generated combinations.

## 🚀 Getting Started

### 🔧 Prerequisites

- **Docker** and **Docker Compose** must be installed.
- Optionally, **Node.js** and **MySQL** if running without Docker.

### 🔁 Clone the Repository

```bash
git clone https://github.com/Aram47/Skillex-Task.git
cd Skillex-Task
```

### 🐳 Install Docker and Docker Compose

If Docker is not installed, follow the official installation guide:  
👉 [Install Docker](https://docs.docker.com/get-docker/)

If Docker Compose is not installed, follow this guide:  
👉 [Install Docker Compose](https://docs.docker.com/compose/install/)

### ⚙️ Environment Configuration

1. A template file `.env.example` is included in the repository.
2. Create a `.env.production` file by copying the template:

```bash
cp .env.example .env.production
```

3. Edit `.env.production` to configure the database credentials and port (if needed).

### ▶️ Run the Project

Ensure you're in the root directory of the project, then run:

```bash
docker-compose up --build
```

This will start the Node.js application and MySQL database containers.

Once running, the API will be available at:  
📡 [http://localhost:7899/generate](http://localhost:7899/generate)

## 📮 API Usage

### POST `/generate`

- **URL:** [http://localhost:7899/generate](http://localhost:7899/generate)
- **Method:** `POST`
- **Content-Type:** `application/json`

#### 📦 Example Request Body

```json
{
  "items": [1, 2, 1],
  "length": 2
}
```

**Explanation:**  
The `items` array `[1, 2, 1]` corresponds to items like `A1`, `B1`, `C1`. The API generates combinations ensuring **no two items share the same starting letter (prefix)**.

#### 📬 Example Response

```json
{
  "id": 1,
  "combinations": [
    ["A1", "B1"],
    ["A1", "B2"],
    ["A1", "C1"],
    ["B1", "C1"],
    ["B2", "C1"]
  ]
}
```

## 🗃️ Database Schema

The project uses the following MySQL tables:

- **`items`**: Stores individual items (e.g., `A1`, `B1`, etc.).
- **`combinations`**: Stores each generated combination with a unique ID.
- **`responses`**: Stores response metadata sent to clients.

🔒 All insert operations are wrapped in **transactions** to ensure data consistency.

## 🧪 Testing the API

To test the API, you can use tools like **Postman**, **cURL**, or any HTTP client. Example using cURL:

```bash
curl -X POST http://localhost:7899/generate \
-H "Content-Type: application/json" \
-d '{"items": [1, 2, 1], "length": 2}'
```

## 📦 Tech Stack

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building the API.
- **MySQL** (`mysql2/promise`): Database and promise-based driver.
- **Docker**: Containerization for consistent environments.
- **Docker Compose**: Multi-container orchestration.

## 📝 Notes

- Ensure the MySQL container is fully initialized before the Node.js app starts (Docker Compose handles dependencies).
- Check the `.env.production` file for correct database credentials.
- The API enforces unique prefixes for items in each combination to ensure valid results.