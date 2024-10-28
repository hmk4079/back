package com.app.back.domain.review;

import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.domain.post.PostVO;
import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class ReviewDTO {
    private Long id;
    private String postTitle;
    private String postContent;
    private String postSummary;
    private String postType;
    private String postStatus;
    private Long postViewCount;
    private Long memberId;
    private String createdDate;
    private String updatedDate;
    private double reviewStarRate;
    private String attachmentFileName;
    private String attachmentFilePath;
    private String attachmentType;
    private String attachmentFileType;
    private Long postId;

    public PostVO toPostVO(){
        return new PostVO(id, postTitle, postContent, postSummary, postType, postStatus, postViewCount, memberId, createdDate, updatedDate);
    }

    public ReviewVO toVO() {
        return new ReviewVO(id, reviewStarRate);
    }

    public AttachmentVO toAttachmentVO(){
        return new AttachmentVO(id, attachmentFileName, attachmentFilePath, attachmentType, attachmentFileType, postId,createdDate);
    }
}
