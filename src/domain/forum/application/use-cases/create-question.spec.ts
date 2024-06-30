import { expect, test } from 'vitest'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { CreateQuestionUsecase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (answer: Question) => {},
}

test('create an question', async () => {
  const createQuestion = new CreateQuestionUsecase(fakeQuestionsRepository)

  const {question} = await createQuestion.execute({
    authorId: '1',
    title: 'New question',
    content: 'content of question'
  })

  expect(question.id).toBeTruthy()
})
