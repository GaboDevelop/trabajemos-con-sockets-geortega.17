# Trabajemos con sockets 

El proyecto es una actividad practica para la materia sistemas distribuidos.

# Instalación y ejecución

Para su instalación primero es necesario clonar el proyecto con el siguiente comando:

```console
$ git clone https://github.com/GaboDevelop/trabajemos-con-sockets-geortega.17.git
```

Luego de clonar el proyecto, ir a la carpeta raíz y ejecutar el proyecto con el siguiente comando:

```console
$ node index.js HOST_SERVER PORT_SERVER PORT_UDP 
```

Siendo `HOST_SERVER` la dirección ip del servidor, `PORT_SERVER` el puerto del servidor y `PORT_UDP` el puerto donde quieres que el cliente escuche los mensajes UDP. Ejemplo:

```console
$ node index.js 127.0.0.1 19876 15602 
```

Si no se pasan estos argumentos los valores por defecto seran `HOST_SERVER=127.0.0.1`, `PORT_SERVER=127.0.0.1`, `PORT_UDP=15602`.
