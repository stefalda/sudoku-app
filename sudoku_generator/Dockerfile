# Usa l'immagine base di Deno
FROM denoland/deno:alpine

# Install OpenJDK JRE
RUN apk add --no-cache openjdk11-jre-headless

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file dell'app
COPY app.ts .
COPY qqwing-1.3.4.jar .

# Esponi la porta del server
EXPOSE 3000

# Avvia il server
CMD ["run", "--allow-net", "--allow-read", "--allow-run", "app.ts"]
