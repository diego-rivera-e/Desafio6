# Desafio6

- Desafío - Soft Jobs.


BD:

CREATE DATABASE softjobs;
\c softjobs;
CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL, password
VARCHAR(60) NOT NULL, rol VARCHAR(25), lenguage VARCHAR(20) );


SELECT * FROM usuarios;

EP:
* POST /usuarios

  
* GET /usuarios


* POST /login



Requerimientos:

Permitir el registro de nuevos usuarios a través de una ruta POST /usuarios
● Ofrecer la ruta POST /login que reciba las credenciales de un usuario y devuelva un
token generado con JWT. Se debe incluir el payload del token el email del usuario
registrado.
● Disponibilizar una ruta GET /usuarios para devolver los datos de un usuario en caso
de que esté autenticado, para esto:
○ Extraiga un token disponible en la propiedad Authorization de las cabeceras
○ Verifique la validez del token usando la misma llave secreta usada en su firma
○ Decodifique el token para obtener el email del usuario a buscar en su payload
○ Obtenga y devuelva el registro del usuario

Registrar y obtener usuarios de la base de datos (1.5 puntos)
2. Usar middlewares para (2 puntos):
a. Verificar la existencia de credenciales en la ruta que corresponda
b. Validar el token recibido en las cabeceras en la ruta que corresponda
c. Reportar por la terminal las consultas recibidas en el servidor
3. Firmar, verificar y decodificar tokens JWT (3 puntos)
4. Capturar y devolver los posibles errores que ocurran en el servidor (0.5 puntos)
5. Encriptar las contraseñas al momento de registrar nuevos usuarios (3 puntos)


