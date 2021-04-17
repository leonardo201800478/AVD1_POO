const { json } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

//A) Array

const provas = [
	{id: 1, dia_semana: 'segunda', data_AVD: '14/06/2021', disciplina: 'Banco de Dados', horario: '17:00', professor: "João" },

    {id: 2, dia_semana: 'quinta', data_AVD: '24/06/2021', disciplina: 'Sistemas Operacionais II', horario: '20:00', professor: "Luiz" }
]

// middleware global e local


  //C
const provaExiste = (request, response, next) => {
	const { index } = request.params
	if (!provas[index]) {
	  return response
		.status(400)
		.json({ Error: ' Não existe data da prova com este id.' })
	}
	return next()
  }
 
  //D
const provaNaRequisicao = (request, response, next) => {
	if (!request.body.id || !request.body.dia_semana || !request.body.data_AVD || !request.body.disciplina || !request.body.horario || !request.body.professor ) {
	  return response
		.status(400)
		.json({ Error: ' O campo dia da semana ou data da avd ou disciplina ou horário ou professor não existe no corpo da requisição.' })
	}
	return next()
  }


//B)  rota para listar todos as datas das provas (exibir o id, dia da semana, 
//data da avd, disciplina, horário de professor).

// Listar todas as provas
// http://localhost:3333/provas

app.get('/provas', (request, response) => {
	return response.json(provas)
 })

//C) rota para listar a data de prova pelo id. Se o id não existir deverá 
//retornar a mensagem: Não existe data da prova com este id. 

// listar prova pelo indice
// parâmetro na rota
// http://localhost:3333/provas/1
// request.params
app.get('/provas/:index', provaExiste, (request, response) => {
	const { index } = request.params
	return response.json(provas.data_AVD[index])
  })
 

 //D) Crie uma rota para incluir a data da prova no array. Deverá ser enviado um json com 
 // a dia da semana, data da avd, disciplina, horário e professor. Se um destes campos 
 // não for enviado a aplicação exibirá a mensagem: O campo dia da semana ou data da 
 // avd ou disciplina ou horário ou professor não existe no corpo da requisição. 
// incluir prova
// método http: post
// request.body
app.post('/inserir', provaNaRequisicao, (request, response) => {
	const { id, dia_semana, data_AVD, disciplina, horario, professor } = request.body
  
	const prova = {
	  id,
	  dia_semana,
	  data_AVD,
	  disciplina,
	  horario,
	  professor
	}
  
	provas.push(prova)
	return response.json(provas)
  })
  

//e) Crie uma rota para alterar a data da prova. Deverá ser enviada o dia da semana, data 
//da avd, disciplina, horário e professor. Se um destes campos não for enviado a 
//aplicação exibirá a mensagem: O campo dia da semana ou data da avd ou disciplina 
//ou horário ou professor não existe no corpo da requisição. Se o id que está sendo 
//alterado não existir, deverá ser exibida a mensagem. Não existe data da prova com 
//este íd. 

  // Alterar provas
  // método http: put
  // request.body
  app.put('/alterar/:index', provaExiste, provaNaRequisicao, (request, response) => {
	// request.params
	const { index } = request.params
  
	// request.body
	const { id, dia_semana, data_AVD, disciplina, horario, professor } = request.body
  
	const prova = {
		id,
		dia_semana,
		data_AVD,
		disciplina,
		horario,
		professor
	}  
	// provas[0]
	provas[index] = prova
	return response.json(provas)
  })
  
// f) Crie uma rota para excluir uma data de prova pelo id. Se id da data da prova que está 
//sendo excluído não existir, deverá ser exibida a mensagem. Não existe data da 
//prova com este id. Exiba no console os dados da avd antes de ser excluído.
// Excluir prova data da prova
// método http: delete
// request.params
  app.delete('/deletar/:index', provaExiste, (request, response) => {
	const { index } = request.params
	provas.splice(index, 1)
	// filter
	return response.json(provas.data_AVD[index])
  })

  //g) Crie uma rota que se informar o nome do professor deverá ser exibido todas as 
  //disciplinas que ele irá aplicar avd. ((dia da semana, data da avd, horário e professor). 
  //Se não existir o professor deverá ser retornado a mensagem Não existe data da avd 
  //para este professor. 

  
  //h) Crie uma rota que se informar o nome da disciplina deverá ser exibido as 
  //informações do dia da prova (dia da semana, data da avd, horário e professor). Se 
  //não existir o nome da disciplina deverá ser retornado a mensagem Não existe data 
  //da avd para esta disciplina.
 

  //Servidor
  app.listen(3333, () => {
	console.log('Servidor rodando')
  })