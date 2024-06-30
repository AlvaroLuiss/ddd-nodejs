import { expect, test } from 'vitest'
import { AnswerQuestionUsecase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../../enterprise/entities/answer'

const fakeAnswersRepository: AnswerRepository = {
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUsecase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova Resposta',
  })

  expect(answer.content).toEqual('Nova Resposta')
})
