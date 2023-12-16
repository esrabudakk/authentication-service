import { EmailType } from "../enums/email-type.enum";
export interface IEmailOptions<ContentType> {
  to: string;
  subject: string;
  type: EmailType;
  content: ContentType
}
