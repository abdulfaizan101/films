import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get(':id')
  getCommentById(@Param('id') id: number) {
    return this.commentService.getCommentById(id,-2,-2);
  }

  @Post()
  createComment(@Body() commentDto: CommentDto) {
    return this.commentService.createComment(commentDto);
  }

  @Put(':id')
  updateComment(@Param('id') id: number, @Body() commentDto: CommentDto) {
    return this.commentService.updateComment(id, commentDto);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: number, @Body() commentDto: CommentDto) {
    return this.commentService.deleteComment(id,commentDto.token,commentDto.userId,commentDto.filmId);
  }
}
