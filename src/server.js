// Servidor
const express = require("express");
const server = express();

// data
const proffys = [
  {
    name: "Levy Araújo",
    avatar:
      "https://avatars0.githubusercontent.com/u/59183140?s=460&u=faa22588ce1c1d27be2a50d9d211915d90c32c0e&v=4",
    whatsapp: "94988049873",
    bio:
      "Apaixonado por programação. Louco por aprender as melhores técnicas e estilos para entregar aquilo que o usuário necessita. Ensino sempre visando o aprendizado de resolver problemas",
    subject: "Programação",
    cost: "50",
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },

  {
    name: "Diego Fernandes",
    avatar:
      "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
    whatsapp: "2199053378",
    bio:
      "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma de minhas explosões",
    subject: "Química",
    cost: "20",
    weekday: [3],
    time_from: [800],
    time_to: [2100],
  },
];

const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
  "Programação",
];

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

// Funcionalidades
const getSubject = (subjectNumber) => {
  const position = +subjectNumber - 1
  return subjects[position]
}

const pageLanding = (req, res) => {
  return res.render("index.html");
};

const pageStudy = (req, res) => {
  const filters = req.query;
  return res.render("study.html", { proffys, filters, subjects, weekdays });
};

const pageGiveClasses = (req, res) => {
  const data = req.query
  const isNotEmpty = Object.keys(data).length > 0

  // Adicionar data à lista de proffys
  if (isNotEmpty) {
    data.subject = getSubject(data.subject)
    proffys.push(data)
    return res.redirect("/study")
  }

  return res.render("give-classes.html");
};

// Configurar nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server
  // Configurando arquivos estáticos (css, scripts, imagens)
  .use(express.static("public"))
  // Configurando as rotas da aplicação
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  .listen("5000");
