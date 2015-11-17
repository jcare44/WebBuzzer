# WebBuzzer

WebApp displaying votes made with PlayStation Buzzer (usefull for quizz or votes)

## Usage

Check the prerequisites of [node-hid](https://github.com/node-hid/node-hid) v0.3.x (or try upgrading to v0.5)

```
npm install
```

Connect your PlayStation buzzer controllers via USB.
![Buzzer Image](http://www.virtualvideogamestore.com/uploads/8/1/9/4/8194123/s856811648446488490_p1044_i1_w500.jpeg)

```
npm start
```

You can now access the public view on `/index.html` and the admin view on `/admin.html`. Use the "Init Players" button on the admin page to chose which buzzers are available to players (by pressing the red button). Reset the votes at any moment using the "Init Time" button.

*You can change the server port by setting the `NODE_SERVER_PORT` environment variable (default 8080).*

## Credits

[GPlay pattern from Dimitrie Hoekstra](http://subtlepatterns.com/gplay/)
