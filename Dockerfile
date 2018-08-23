FROM trkoch/neos-cms:3-composer
MAINTAINER Tristan Koch tristan@tknetwork.de

ENV VENDOR=Hermetic.HermeticCom

# Run `composer install`
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --optimize-autoloader

# Run `npm install`
COPY Packages/Sites/$VENDOR/Resources/package*.json ./Packages/Sites/$VENDOR/Resources/
RUN (cd ./Packages/Sites/$VENDOR/Resources/ && npm install)

# Copy site
COPY Packages/Sites/$VENDOR/ ./Packages/Sites/$VENDOR/

# Run `webpack`
RUN (cd ./Packages/Sites/$VENDOR/Resources && node_modules/.bin/webpack -p)

# Copy supplemental files
COPY Web/mail.php ./Web/
COPY Web/.htaccess ./Web/

CMD ["neos"]
