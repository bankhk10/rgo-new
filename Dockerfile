# ใช้ Node.js เป็น base image
FROM node:22-alpine


# ตั้ง working directory ใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json (หรือ yarn.lock)
COPY package*.json ./
COPY yarn.lock ./

# ติดตั้ง dependencies
RUN yarn install --frozen-lockfile

# คัดลอก source code ทั้งหมด
COPY . .

# build application
RUN yarn build

# ใช้ nginx สำหรับ static file serving ใน production
FROM nginx:alpine

# copy built application จาก stage ก่อนหน้า
COPY --from=0 /app/dist /usr/share/nginx/html

# expose port ที่ nginx รันอยู่
EXPOSE 80

# สั่งให้ nginx เริ่มทำงาน
CMD ["nginx", "-g", "daemon off;"]