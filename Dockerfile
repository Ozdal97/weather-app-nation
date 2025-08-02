# 1. Builder aşaması
FROM node:20-alpine AS builder

# 2. Çalışma dizini
WORKDIR /app

# 3. Paketleri kopyala ve install et
COPY package*.json ./
RUN npm install

# 4. Kaynak kodu kopyala ve derle
COPY . .
RUN npm run build && echo ">>> dist içeriği <<<" && ls -la dist

# 5. Prod imajı
FROM node:20-alpine

# 6. Çalışma dizini
WORKDIR /app

# 7. Yalnızca production bağımlılıkları
COPY package*.json ./
RUN npm install --only=production

# 8. Migration CLI ve seed betiği için gerekli dosyalar
COPY data-source.ts ./
COPY tsconfig.json ./
COPY src ./src

# 9. Derlenmiş dosyaları ekle
COPY --from=builder /app/dist ./dist

# 10. Port
EXPOSE 3000

# 11. Başlatma komutu
CMD ["node", "dist/src/main.js"]
