# Movies API

A movies API similar to the one built at Mosh's Hamedani Node course

## Install MongoDB

### MongoDB Status

```
sudo systemctl status mongodb
```

### Install MongoDB (ubuntu)

```
sudo apt install mongodb
```

It will run automatically on port 27017

### By default MongoDB stores data in the directory /data/db. So create it

```
sudo mkdir -p /data/db
```

### Give permissions to the folder

```
sudo chown -R `id -un` /data/db/
```

### Run mongodb daemon

```
mongod
```

### Optionally install MongoDB Compass

A DB GUI that lets you see your tables, your DBs etc.

## Run the project

clone the project

select master branch

### Install dependencies

```
npm install
```

### Start the server

```
node index.js
```

browser listens to [http://localhost:3900](http://localhost:3900) as default port
