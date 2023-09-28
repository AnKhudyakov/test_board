export interface Comment {
    id: string;
    content: string;
    comments: Comment[];
    created: Date | string;
  }