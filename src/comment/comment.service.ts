import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private jwtService: JwtService,
  ) {}

  async getAllComments() {
    return this.commentRepository.find();
  }

  async getCommentById(id: number, userId: number, filmId: number) {
    if(userId != -2){
      return this.commentRepository.findOne({where: {id, userId, filmId}});
    }
    return this.commentRepository.findOne({where: {id}});
  }

  async createComment(commentDto: CommentDto) {
    try {      
      let data = this.jwtService.verify(commentDto.token);
      if(data.id){
        const comment = this.commentRepository.create(commentDto);
        return this.commentRepository.save(comment);
      }
      return 'Error';
    } catch (error) {
      return "Token Invalid"      
    }
  }

  async updateComment(id: number, commentDto: CommentDto) {
    try {      
      let data = this.jwtService.verify(commentDto.token);
      if(data.id){
        const comment = await this.getCommentById(id,commentDto.userId, commentDto.filmId);
        if (!comment) {
          throw new Error('Comment not found');
        }

        const updatedComment = { ...comment, ...commentDto };
        return this.commentRepository.save(updatedComment);
      }
      return 'Error';
    } catch (error) {
      return "Token Invalid"      
    }
  }

  async deleteComment(id: number, token: string, userId: number, filmId: number) {
    try {      
      let data = this.jwtService.verify(token);
      if(data.id){
        const comment = await this.getCommentById(id,userId, filmId);
        if (!comment) {
          throw new Error('Comment not found');
        }

        return this.commentRepository.remove(comment);
      }
      return 'Error';
    } catch (error) {
     return "Token Invalid"      
    }
  }
}
