const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const express = require('express');
const app = express();
const port = 3000;
const config = require("./config.json");
var msgContent;
var authorURL;
var srvInvitation = config.invite;
let prefix = config.prefix;

const help = new Discord.MessageEmbed()
  .setTitle ("Ayuda de Golden Bot")
  .setColor (0xFFC71A)
  .addField ("*rules", "Muestra la leyes/reglas del servidor")
  .addField ("*laws", "Muestra la leyes/reglas del servidor")
  .addField ("*invite", "Invita al bot en tu servidor")
  .addField ("*srvInvite", "Toma una invitacion del servidor")
  .addField ("*avatar", "Mira la imagen y fecha de creacion de tu avatar")
  .addField ("*say", "Para hablar fingiendo ser el bot")
  .addField ("*owner", "Mira quien creo el bot B)");

const reactions = new Discord.MessageEmbed()
  .setTitle ("Ayuda de First bot")
  .setColor (0xFFC71A)
  .addField ("Reacciona", "usa las reacciones para obtener roles especificos");

const rules = new Discord.MessageEmbed()
  .setTitle ("Las leyes de la constitucion")
  .setColor (0xFFC71A)
  .addField ("1ro articulo", "No se permite copiar y pegar texto, solamente imágenes, links, GIFS, con un limite de 3 por cada 5 minutos.")
  .addField ("2do articulo", "No se permite escribir demasiados mensajes de solo una palabra en un breve periodo, tampoco de palabras al azar, tampoco textos largos, en pocas palabras explotar el chat, o ganar XP de manera fraudulenta.")
  .addField ("3ro articulo", "No se puede insultar con palabras fuertes a las demás personas, pero si se puede hacer bromas, si el usuario pide que paren las bromas hacia su persona, deberán ser paradas.")
  .addField ("4to articulo", "No se puede hacer mas de 3 menciones en un periodo de 5 minutos hacia un usuario de Junta para jugar. (A menos que sea una citación)")
  .addField ("5to articulo", "No se puede hacer mas de 1 mención everyone en un periodo de 10 minutos.")
  .addField ("6to articulo", "No se puede incumplir las ordenes de un admin (a menos que abusen su identidad personal, las leyes del país de origen del usuario, o su integridad personal).")
  .addField ("7mo articulo", "Se debe respetar la religión, origen, cultura y opiniones personales de cada usuario. (mientras estas también respetan la de los demás y los demás artículos)")
  .addField ("8vo articulo", "No escribas nada repulsivo, ejemplos de esto seria lo gore, lo +18, ni asqueroso.")
  .addField ("9no articulo", "Sigue las reglas de proyectos de 3ros relacionados al servidor, junto a las reglas de aqui.");

const owner = new Discord.MessageEmbed()
.setTitle ("Este es el creador: https://twitter.com/BlazingShotGT")
.setColor (0xFFC71A)
.setImage ("https://pbs.twimg.com/profile_images/1374061599351312388/BG4gGZLW_400x400.jpg");

app.get("/", function (request, response) {
response.sendFile(__dirname + "/Pagina.html");});

app.listen(port, () => console.log("Iniciado"));

client.on("ready", () => {
console.log(`Iniciado Como: ${client.user.tag}!`);

client.user.setUsername("Golden bot")
client.user.setPresence({activity: {name: "*help", type: "WATCHING"}, status:"online"});})

//Codigos propios del bot
client.on("message", (message) => {

msgContent = message.content;
authorURL = message.author.displayAvatarURL();

if (!msgContent.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
let text = args.join(" ");

switch(command)
{
  case "help":
  if(!args.length){
    message.reply("aqui lo solicitado.", { embed: help });
  }
  else if(args[0].toLowerCase() === "pto"){
    message.reply("eh?");
  }
  break;

  case "rules":
  message.reply({ embed: rules });
  break;

  case "laws":
  message.reply({ embed: rules });
  break;

  case "owner":
  message.reply("aqui lo solicitado.", { embed: owner });
  break;

  case "invite":
  message.reply("uneme a tu servidor con este link: https://discord.com/oauth2/authorize?client_id=754234726184779828&scope=bot&permissions=8");
  break;

  case "srvinvite":
  if(!args.length){
    message.reply(`toma la invitacion de este server: ${srvInvitation}`);
  } 
  else if(args[0].toLowerCase() === "set"){
    config.invite = args[1];
    srvInvitation = args[1];
    message.reply(`se ha completado, link cambiado a: ${srvInvitation}`)
  }
  break;

  case "avatar":
  var avatar = new Discord.MessageEmbed()
  .setTitle (message.author.username)
  .addField ("Perfil creado", message.author.createdAt)
  .setColor (0xFFC71A)
  .setImage (authorURL);
  
  message.reply({ embed: avatar });
  break;

  case "say":
  if(!text) return message.channel.send(`Escriba el contenido a enviar.`);

  message.channel.send(text);
  message.delete();
  break;

  case "reactionrole":
  const channel = '861718614687088660';
  const universoRole = message.guild.roles.cache.find(role => role.name === "UniversoPlayers")
  
  const universoEmoji = '861742015024726026';

  let newEmbed = new Discord.MessageEmbed()
    .setTitle ("**__Elige tu rol__**")
    .setColor (0xFFC71A)
    .setDescription ("Pulsa a uno de los emojis de abajo para autoasignarse.\n\n**[Rol UniversoPlayers] == **:Gato:");

  let themsg = message.reply({ embed: newEmbed });

  newEmbed.react("🤔");

  break;
}})

client.login(config.token);