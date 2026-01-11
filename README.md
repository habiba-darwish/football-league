# Football League Management System

A backend API built with **NestJS**, **TypeORM**, and **PostgreSQL** to manage football leagues.  
It supports CRUD operations for **Clubs, Teams, Players, Stadiums, and Matches**, with conflict‑checking logic to prevent overlapping matches.

---

## Features
- **Authentication** with JWT (admin user auto‑created at startup).
- **CRUD APIs** for:
  - Clubs
  - Teams
  - Players
  - Stadiums
  - Matches
- **Conflict Checking**:
  - Prevents scheduling matches in the same stadium within 120 minutes.
- **Logging Interceptor**:
  - Logs requests, responses, and execution time.
- **Environment Variables**:
  - Secure configuration via `.env` file.

---

## Project Structure
```
src/
├── app.module.ts
├── app.controller.ts
├── app.service.ts
├── config/
│   ├── database.config.ts
│   └── jwt.config.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── clubs.controller.ts
│   ├── matches.controller.ts
│   ├── players.controller.ts
│   ├── stadiums.controller.ts
│   └── teams.controller.ts
├── services/
│   ├── auth.service.ts
│   ├── clubs.service.ts
│   ├── matches.service.ts
│   ├── players.service.ts
│   ├── stadiums.service.ts
│   └── teams.service.ts
├── models/
│   ├── user.model.ts
│   ├── club.model.ts
│   ├── team.model.ts
│   ├── player.model.ts
│   ├── stadium.model.ts
│   └── match.model.ts
└── utils/
    └── match-conflict.util.ts
```

---

##  Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/football-league.git
cd football-league
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=football_league

# JWT
JWT_SECRET=superSecretKey
JWT_EXPIRES_IN=1h

# Admin user
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 4. Run the application
```bash
npm run start:dev
```

---

## Testing with Postman

### Sequence of Requests
1. **Login**
   ```
   POST /auth/login
   {
     "userName": "admin",
     "password": "admin123"
   }
   ```
   → Save `access_token` for Authorization.

2. **Create Club**
   ```
   POST /clubs
   { "name": "FC Cairo" }
   ```

3. **Create Teams**
   ```
   POST /teams
   { "name": "Cairo Eagles", "coachName": "Ahmed Hassan", "clubId": 1 }

   POST /teams
   { "name": "Cairo Lions", "coachName": "Omar Ali", "clubId": 1 }
   ```

4. **Create Player**
   ```
   POST /players
   { "name": "Mohamed Salah", "position": "Forward", "shirtNumber": 10, "teamId": 1 }
   ```

5. **Create Stadium**
   ```
   POST /stadiums
   { "name": "Cairo International Stadium", "capacity": 75000 }
   ```

6. **Create Match**
   ```
   POST /matches
   {
     "homeTeam": 1,
     "awayTeam": 2,
     "stadium": 1,
     "matchDate": "2025-12-10T18:00:00Z"
   }
   ```

7. **Read / Update / Delete**
   - `GET /clubs`, `GET /teams`, `GET /players`, `GET /stadiums`, `GET /matches`
   - `PUT /clubs/:id`, `PUT /teams/:id`, etc.
   - `DELETE /clubs/:id`, `DELETE /teams/:id`, etc.

---

API Documentation
We’ve prepared a Postman collection with all endpoints (Clubs, Teams, Players, Stadiums, Matches, Auth).  
You can explore and test them here:

[![Football League API Postman Docs](https://img.shields.io/badge/Postman-Documentation-orange?logo=postman)](https://documenter.getpostman.com/view/47449582/2sB3dPTWCt)


---


## Conflict Rules
- Matches in the same stadium must be **at least 120 minutes apart**.
- Teams cannot be deleted if they are referenced in matches .


---

##  Logging
Custom interceptor logs:
- Request method, URL, body
- Response status, data
- Execution time

---

##  Tech Stack
- **NestJS** (framework)
- **TypeORM** (ORM)
- **PostgreSQL** (database)
- **JWT** (authentication)
- **bcrypt** (password hashing)

---

##  Summary
This API provides a robust backend for managing football leagues, ensuring fair scheduling, secure authentication, and clean logging. It’s ready to be extended with features like team conflict checks, soft deletes, or role‑based access control.

---

