# Weather App Nation

Bu proje, NestJS ile geliştirilmiş, MySQL ve Redis kullanan hava durumu sorgu servisini içerir. Container’lar Docker Compose ile yönetilir; JWT tabanlı kimlik doğrulama, Role-Based Access Control, Swagger dokümantasyonu, TypeORM migration ve seed, Redis cache, OpenWeather API entegrasyonu gibi özellikleri barındırır.

---

## 🚀 Başlarken

### Önkoşullar

- [Docker](https://docs.docker.com/get-docker/) (v20+)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/YOUR_USERNAME/weather-app-nation.git
cd weather-app-nation
```

### 2. Ortam Değişkenlerini Ayarlayın

Kök dizinde bir `.env` dosyası oluşturun:

```bash
cp .env.example .env
```

İçeriğini şöyle güncelleyin:

```dotenv
# MySQL
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=weatherdb
MYSQL_USER=weather_user
MYSQL_PASSWORD=weather_pass

# Uygulama — TypeORM
DATABASE_HOST=db
DATABASE_PORT=3306
DATABASE_USERNAME=${MYSQL_USER}
DATABASE_PASSWORD=${MYSQL_PASSWORD}
DATABASE_NAME=${MYSQL_DATABASE}

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# JWT
JWT_SECRET=changeme!
JWT_EXPIRES_IN=3600s

# OpenWeather API
WEATHER_API_KEY=your_openweather_api_key
```

> **Not:** OpenWeatherMap anahtarınızı [buradan](https://openweathermap.org/) alın ve `WEATHER_API_KEY` olarak yapıştırın. API anahtarınızın aktifleşmesi 1–2 saat sürebilir.

---

## 🐳 Docker ile Çalıştırma

Tüm servisleri ayağa kaldırmak için:

```bash
docker-compose up --build -d
```

- **app**: NestJS uygulaması (http://localhost:3000)  
- **db**: MySQL (port 3306)  
- **redis**: Redis (port 6379)  

Konteynerleri durdurmak ve silmek için:

```bash
docker-compose down
```

---

## 📦 Veritabanı Migration & Seed

1. **Migration çalıştırma**

   ```bash
   docker-compose exec app npm run migration:run
   ```

   > “No migrations are pending” göründüyse tablolarınız zaten oluşturulmuştur.

2. **Seed (admin kullanıcısı ekleme)**

   ```bash
   docker-compose exec app npm run seed
   ```

   Çıktıda “Seed: Created admin user (admin@example.com/password123)” veya “already exists” göreceksiniz.

---

## 🛠️ Uygulamaya Erişim

- **API root**: `http://localhost:3000`  
- **Swagger UI**: `http://localhost:3000/api-docs`  
  - “Authorize” butonuna `Bearer <token>` girerek korumalı endpoint’leri test edebilirsiniz.  

### Örnek Postman Akışı

1. `POST /users/register` → kullanıcı oluştur  
2. `POST /auth/login` → token al  
3. Header’a `Authorization: Bearer {{token}}` ekleyip  
4. `GET /weather?city=Istanbul` → hava sorgusu  

---

## 🧪 Testler

Projeyi lokal çalıştırdıktan sonra (node/npm kurulumuyla):

```bash
npm install
npm run build
npm test            # Birim testleri
npm run test:e2e    # E2E testleri (Supertest)
```

---

## 📂 Dosya Yapısı

```
weather-app-nation/
├─ src/
│  ├─ auth/
│  ├─ common/
│  ├─ config/
│  ├─ users/
│  ├─ weather/
│  └─ main.ts
├─ migrations/
├─ data-source.ts
├─ Dockerfile
├─ docker-compose.yml
├─ .env.example
├─ package.json
└─ tsconfig.json
```

---

## 📖 Daha Fazla Bilgi

- [NestJS Dokümantasyonu](https://docs.nestjs.com/)  
- [TypeORM Migrations](https://typeorm.io/migrations)  
- [Swagger/A OpenAPI NestJS](https://docs.nestjs.com/openapi/introduction)  

---

**Keyfe keder kodlamalar!**
