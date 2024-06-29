import { Answer } from "../entities/answer"

interface AnswerQuestionUsecaseRequest {
    instructorId: string,
    questionId: string
    content: string
}

export class AnswerQuestionUsecase {
    execute({ instructorId, questionId, content }: AnswerQuestionUsecaseRequest ) {
        const answer = new Answer({
            content,
            authorId: instructorId,
            questionId
        })

        return answer
    }
}