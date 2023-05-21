using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineExam.Areas.Admin.ViewModel
{
    public class VmChapterContent
    {
        public int ChapterId { get; set; }
        public string ChapterName { get; set; }
        public bool IsActive { get; set; }
        public string ChapterContent { get; set; }
        public int ChapterContentId { get; set; }
    }

}