import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/entities/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AnswerProps {
  content: string
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  createdAt: Date
  updateAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.content
  }

  get questionId() {
    return this.props.content
  }

  get createdAt() {
    return this.props.content
  }

  get updateAt() {
    return this.props.content
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updateAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return answer
  }
}
