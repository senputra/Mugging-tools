export class Matter {
  title: string;
  description: string;
  attachment: string;

  isUrgent: boolean;

  constructor(
    title: string,
    description: string,
    attachment: string,
    isUrgent: boolean
  ) {
    this.title = title;
    this.description = description;
    this.attachment = attachment;
    this.isUrgent = isUrgent;
  }
}
