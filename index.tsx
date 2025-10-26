import React from 'react';
import ReactDOM from 'react-dom/client';

const { useState, useEffect, useMemo, useCallback, useRef } = React;

interface Word {
    english: string;
    vietnamese: string;
    englishExample: string;
    vietnameseExample: string;
}

interface Topic {
    title: string;
    words: Word[];
}

interface Mistake {
    word: Word;
    sentenceErrorCount: number;
}

const vocabularyData: Topic[] = [
    {
        title: "Chủ đề 1 – School & Daily Activities",
        words: [
            { english: "school", vietnamese: "trường học", englishExample: "I go to school at 7 a.m. / Our school is big and beautiful.", vietnameseExample: "Tôi đi học lúc 7 giờ. / Trường chúng tôi lớn và đẹp." },
            { english: "classroom", vietnamese: "phòng học", englishExample: "The classroom is very big. / Our classroom has thirty students.", vietnameseExample: "Phòng học rất rộng. / Lớp chúng tôi có 30 học sinh." },
            { english: "class", vietnamese: "lớp học", englishExample: "My class is on the first floor. / We have five classes today.", vietnameseExample: "Lớp của tôi ở tầng một. / Hôm nay chúng tôi có năm tiết." },
            { english: "grade", vietnamese: "khối lớp", englishExample: "Which grade are you in? — I’m in grade 6. / She moved to a higher grade this year.", vietnameseExample: "Bạn học lớp mấy? — Mình lớp 6. / Cô ấy lên lớp cao hơn năm nay." },
            { english: "teacher", vietnamese: "giáo viên", englishExample: "What is your teacher like? / My English teacher is kind and funny.", vietnameseExample: "Giáo viên của bạn như thế nào? / Cô tiếng Anh của tôi hiền và vui." },
            { english: "student", vietnamese: "học sinh", englishExample: "Every student must wear a uniform. / The new student is from Hue.", vietnameseExample: "Mỗi học sinh phải mặc đồng phục. / Học sinh mới đến từ Huế." },
            { english: "homework", vietnamese: "bài tập về nhà", englishExample: "I usually do my homework at night. / Don’t forget to hand in your homework.", vietnameseExample: "Tôi làm bài tập vào buổi tối. / Đừng quên nộp bài tập." },
            { english: "exercise", vietnamese: "bài tập", englishExample: "This exercise is easy. / Let’s do Exercise 3 together.", vietnameseExample: "Bài tập này dễ. / Hãy làm bài tập số 3 cùng nhau." },
            { english: "exam", vietnamese: "kỳ thi", englishExample: "I’m studying for my exam. / The final exam is next Monday.", vietnameseExample: "Tôi đang ôn thi. / Kỳ thi cuối kỳ vào thứ Hai tới." },
            { english: "test", vietnamese: "bài kiểm tra", englishExample: "We have an English test tomorrow. / She got ten points in the test.", vietnameseExample: "Ngày mai có bài kiểm tra tiếng Anh. / Cô ấy được 10 điểm." },
            { english: "subject", vietnamese: "môn học", englishExample: "My favorite subject is English. / What subjects do you have today?", vietnameseExample: "Môn học yêu thích là Tiếng Anh. / Hôm nay bạn có những môn gì?" },
            { english: "lesson", vietnamese: "bài học", englishExample: "The next lesson is Maths. / This is our first English lesson.", vietnameseExample: "Tiết tiếp theo là Toán. / Đây là tiết tiếng Anh đầu tiên." },
            { english: "uniform", vietnamese: "đồng phục", englishExample: "We have to wear our school uniform. / I wash my uniform every Sunday.", vietnameseExample: "Phải mặc đồng phục. / Tôi giặt đồng phục vào Chủ nhật." },
            { english: "break", vietnamese: "giờ ra chơi", englishExample: "We play football at break time. / Let’s have a short break now.", vietnameseExample: "Chúng tôi chơi lúc ra chơi. / Nghỉ ngắn một chút." },
            { english: "break time", vietnamese: "giờ ra chơi", englishExample: "We play football at break time. / Students eat snacks at break time.", vietnameseExample: "Chúng tôi chơi vào giờ ra chơi. / Học sinh ăn nhẹ giờ ra chơi." },
            { english: "recess", vietnamese: "giờ nghỉ", englishExample: "They talk to friends at recess. / We read books in recess sometimes.", vietnameseExample: "Họ nói chuyện lúc nghỉ. / Đôi khi chúng tôi đọc sách lúc nghỉ." },
            { english: "schedule", vietnamese: "thời khóa biểu", englishExample: "My schedule is busy on Mondays. / Check the schedule for next week.", vietnameseExample: "Thời khóa biểu bận thứ Hai. / Kiểm tra lịch tuần tới." },
            { english: "timetable", vietnamese: "thời khóa biểu", englishExample: "The timetable is on the board. / Our new timetable has more English classes.", vietnameseExample: "Thời khóa biểu ở trên bảng. / Lịch học mới có thêm tiết tiếng Anh." },
            { english: "schoolbag", vietnamese: "cặp sách", englishExample: "My schoolbag is on the desk. / I carry my books in my schoolbag.", vietnameseExample: "Cặp của tôi trên bàn. / Tôi để sách trong cặp." },
            { english: "desk", vietnamese: "bàn học", englishExample: "I clean my desk every day. / Put your books on the desk.", vietnameseExample: "Tôi lau bàn mỗi ngày. / Đặt sách lên bàn." },
            { english: "board", vietnamese: "bảng", englishExample: "The answers are on the board. / Don’t write on the board now.", vietnameseExample: "Đáp án trên bảng. / Đừng viết lên bảng lúc này." },
            { english: "pen", vietnamese: "cây bút", englishExample: "Do you have a red pen? / I write with my new pen.", vietnameseExample: "Bạn có bút đỏ không? / Tôi viết bằng bút mới." },
            { english: "pencil", vietnamese: "bút chì", englishExample: "Please sharpen your pencil. / I draw with a pencil.", vietnameseExample: "Làm ơn chuốt bút chì. / Tôi vẽ bằng bút chì." },
            { english: "eraser", vietnamese: "cục tẩy", englishExample: "May I borrow your eraser? / The eraser is on the table.", vietnameseExample: "Tôi mượn cục tẩy được không? / Cục tẩy ở trên bàn." },
            { english: "ruler", vietnamese: "thước kẻ", englishExample: "Use a ruler to draw a line. / My ruler is twenty centimeters long.", vietnameseExample: "Dùng thước kẻ đường. / Thước của tôi dài 20 cm." },
            { english: "notebook", vietnamese: "quyển vở", englishExample: "Open your notebook. / My notebook is full of notes.", vietnameseExample: "Mở vở ra. / Vở tôi đầy ghi chú." },
            { english: "attend", vietnamese: "đi học / tham dự", englishExample: "He attends school regularly. / She attends the English club every Friday.", vietnameseExample: "Cậu ấy đi học đều. / Cô ấy tham gia CLB tiếng Anh mỗi thứ Sáu." },
            { english: "participate", vietnamese: "tham gia", englishExample: "Very few students participate in the club. / We participate in sports day.", vietnameseExample: "Ít học sinh tham gia CLB. / Chúng tôi tham gia ngày hội thể thao." },
            { english: "take part", vietnamese: "tham gia", englishExample: "Very few students take part in the club. / Do you want to take part in the contest?", vietnameseExample: "Ít học sinh tham gia. / Bạn muốn tham gia cuộc thi không?" },
            { english: "join", vietnamese: "tham gia / gia nhập", englishExample: "Join the club if you like sports. / I joined the school choir last year.", vietnameseExample: "Tham gia CLB nếu em thích thể thao. / Tôi gia nhập dàn hợp xướng năm ngoái." },
            { english: "club", vietnamese: "câu lạc bộ", englishExample: "She takes part in the school’s badminton club. / The drama club meets on Wednesdays.", vietnameseExample: "Cô ấy tham gia CLB cầu lông. / Câu lạc bộ kịch họp thứ Tư." },
            { english: "extracurricular", vietnamese: "ngoại khóa", englishExample: "She attends extracurricular classes after school. / Extracurricular activities help students learn more.", vietnameseExample: "Cô ấy học ngoại khóa sau giờ. / Hoạt động ngoại khóa giúp học sinh học thêm." },
            { english: "extracurricular activity", vietnamese: "hoạt động ngoại khóa", englishExample: "He joined an extracurricular activity last term. / Many students choose extracurricular activities they like.", vietnameseExample: "Cậu ấy tham gia hoạt động ngoại khóa kỳ trước. / Nhiều học sinh chọn hoạt động ngoại khóa yêu thích." },
            { english: "revise", vietnamese: "ôn tập", englishExample: "We revise the lesson before the test. / I revise vocabulary every night.", vietnameseExample: "Chúng tôi ôn trước khi kiểm tra. / Tôi ôn từ vựng hàng đêm." },
            { english: "prepare", vietnamese: "chuẩn bị", englishExample: "Prepare for your lessons carefully. / I prepare my books before class.", vietnameseExample: "Hãy chuẩn bị bài. / Tôi chuẩn bị sách trước giờ học." },
            { english: "hand in", vietnamese: "nộp (bài)", englishExample: "Hand in your homework on Monday. / Please hand in the worksheet now.", vietnameseExample: "Nộp bài vào thứ Hai. / Nộp phiếu bài tập giờ này." },
            { english: "mark", vietnamese: "điểm số", englishExample: "She got a high mark in the exam. / He often gets good marks in English.", vietnameseExample: "Cô ấy đạt điểm cao. / Cậu ấy thường được điểm tốt." },
            { english: "score", vietnamese: "điểm", englishExample: "She scored well in the test. / What score did you get?", vietnameseExample: "Cô ấy đạt điểm cao trong bài. / Bạn được bao nhiêu điểm?" },
            { english: "rule", vietnamese: "quy định", englishExample: "Don’t break school rules. / One rule is “Be on time.”", vietnameseExample: "Đừng vi phạm nội quy. / Một quy định là đúng giờ." },
            { english: "late", vietnamese: "muộn", englishExample: "Don’t be late for class. / He was late for the exam yesterday.", vietnameseExample: "Đừng đến muộn. / Hôm qua cậu ấy đến muộn thi." },
            { english: "tidy", vietnamese: "gọn gàng", englishExample: "Keep your desk tidy. / Students must keep the classroom tidy.", vietnameseExample: "Giữ bàn gọn gàng. / Học sinh phải giữ lớp sạch." },
            { english: "prepare (exam)", vietnamese: "chuẩn bị (thi)", englishExample: "I’m preparing for the IOE exam. / Prepare your notes for the test.", vietnameseExample: "Tôi đang ôn thi IOE. / Chuẩn bị ghi chú cho bài kiểm tra." }
        ]
    },
    {
        title: "Chủ đề 2 – Family & Friends",
        words: [
            { english: "family", vietnamese: "gia đình", englishExample: "My family has four people. / I love spending time with my family.", vietnameseExample: "Gia đình tôi có bốn người. / Tôi thích dành thời gian với gia đình." },
            { english: "father", vietnamese: "cha", englishExample: "My father works in a factory. / His father is tall and kind.", vietnameseExample: "Cha tôi làm trong nhà máy. / Cha của cậu ấy cao và tốt bụng." },
            { english: "mother", vietnamese: "mẹ", englishExample: "My mother is a teacher. / Her mother cooks very well.", vietnameseExample: "Mẹ tôi là giáo viên. / Mẹ cô ấy nấu ăn rất ngon." },
            { english: "parents", vietnamese: "cha mẹ", englishExample: "My parents are kind and helpful. / Parents always care about their children.", vietnameseExample: "Cha mẹ tôi rất tốt bụng. / Cha mẹ luôn quan tâm con cái." },
            { english: "brother", vietnamese: "anh / em trai", englishExample: "I have an older brother. / My brother plays football every day.", vietnameseExample: "Tôi có anh trai. / Anh tôi chơi bóng hằng ngày." },
            { english: "sister", vietnamese: "chị / em gái", englishExample: "My sister likes singing. / Her sister is a student, too.", vietnameseExample: "Em gái tôi thích hát. / Em gái cô ấy cũng là học sinh." },
            { english: "cousin", vietnamese: "anh/chị/em họ", englishExample: "My cousin lives in Hanoi. / I often visit my cousins in the summer.", vietnameseExample: "Anh họ tôi sống ở Hà Nội. / Tôi thường thăm họ hàng vào mùa hè." },
            { english: "uncle", vietnamese: "chú / cậu / bác", englishExample: "My uncle is a farmer. / I help my uncle on his farm.", vietnameseExample: "Chú tôi là nông dân. / Tôi giúp chú làm nông." },
            { english: "aunt", vietnamese: "cô / dì", englishExample: "My aunt is a doctor. / I visit my aunt every weekend.", vietnameseExample: "Cô tôi là bác sĩ. / Tôi thăm cô mỗi cuối tuần." },
            { english: "grandparents", vietnamese: "ông bà", englishExample: "I visit my grandparents every weekend. / My grandparents tell me interesting stories.", vietnameseExample: "Tôi thăm ông bà mỗi cuối tuần. / Ông bà kể chuyện hay cho tôi nghe." },
            { english: "grandfather", vietnamese: "ông", englishExample: "My grandfather is very old. / Her grandfather loves gardening.", vietnameseExample: "Ông tôi đã già. / Ông cô ấy thích làm vườn." },
            { english: "grandmother", vietnamese: "bà", englishExample: "My grandmother makes delicious cakes. / We love our grandmother very much.", vietnameseExample: "Bà tôi làm bánh rất ngon. / Chúng tôi rất yêu bà." },
            { english: "friend", vietnamese: "bạn", englishExample: "She is my best friend. / My friends are very kind.", vietnameseExample: "Cô ấy là bạn thân tôi. / Bạn tôi rất tốt bụng." },
            { english: "best friend", vietnamese: "bạn thân", englishExample: "Lan is my best friend. / My best friend always helps me.", vietnameseExample: "Lan là bạn thân của tôi. / Bạn thân của tôi luôn giúp đỡ tôi." },
            { english: "classmate", vietnamese: "bạn cùng lớp", englishExample: "My classmates are friendly. / Minh is my new classmate.", vietnameseExample: "Các bạn cùng lớp rất thân thiện. / Minh là bạn cùng lớp mới của tôi." },
            { english: "neighbor", vietnamese: "hàng xóm", englishExample: "Our neighbors are very nice. / I sometimes play with my neighbor’s dog.", vietnameseExample: "Hàng xóm của chúng tôi rất dễ thương. / Tôi thỉnh thoảng chơi với chó của hàng xóm." },
            { english: "people", vietnamese: "con người", englishExample: "There are many people in my family. / People in my village are friendly.", vietnameseExample: "Có nhiều người trong gia đình tôi. / Người trong làng tôi thân thiện." },
            { english: "child", vietnamese: "đứa trẻ", englishExample: "Every child loves his parents. / The child is playing in the garden.", vietnameseExample: "Mỗi đứa trẻ yêu cha mẹ mình. / Đứa trẻ đang chơi trong vườn." },
            { english: "children", vietnamese: "trẻ em", englishExample: "The children are watching TV. / Children must go to school.", vietnameseExample: "Bọn trẻ đang xem TV. / Trẻ em phải đi học." },
            { english: "relative", vietnamese: "họ hàng", englishExample: "We visit our relatives at Tet. / She has many relatives in Hue.", vietnameseExample: "Chúng tôi thăm họ hàng dịp Tết. / Cô ấy có nhiều họ hàng ở Huế." },
            { english: "love", vietnamese: "yêu thương", englishExample: "I love my parents very much. / They love helping their friends.", vietnameseExample: "Tôi rất yêu cha mẹ. / Họ thích giúp bạn bè." },
            { english: "care", vietnamese: "quan tâm / chăm sóc", englishExample: "Parents care about their children. / She cares for her little sister.", vietnameseExample: "Cha mẹ quan tâm con cái. / Cô ấy chăm sóc em gái." },
            { english: "help", vietnamese: "giúp đỡ", englishExample: "I help my mother every day. / My brother helps me with homework.", vietnameseExample: "Tôi giúp mẹ mỗi ngày. / Anh tôi giúp tôi làm bài tập." },
            { english: "share", vietnamese: "chia sẻ", englishExample: "We share everything with our friends. / I share my lunch with my friend.", vietnameseExample: "Chúng tôi chia sẻ mọi thứ với bạn. / Tôi chia cơm trưa với bạn." },
            { english: "talk", vietnamese: "nói chuyện", englishExample: "We talk about school at dinner. / She likes talking to her friends.", vietnameseExample: "Chúng tôi nói chuyện về trường lúc ăn tối. / Cô ấy thích nói chuyện với bạn." },
            { english: "visit", vietnamese: "thăm", englishExample: "I visit my grandparents on weekends. / They visit their uncle in the countryside.", vietnameseExample: "Tôi thăm ông bà vào cuối tuần. / Họ thăm chú ở nông thôn." },
            { english: "friendly", vietnamese: "thân thiện", englishExample: "Our teacher is friendly to students. / She is a friendly girl.", vietnameseExample: "Cô giáo thân thiện với học sinh. / Cô ấy là cô gái thân thiện." },
            { english: "kind", vietnamese: "tốt bụng", englishExample: "My mother is very kind. / It’s kind of you to help me.", vietnameseExample: "Mẹ tôi rất tốt bụng. / Bạn thật tử tế khi giúp tôi." },
            { english: "sociable", vietnamese: "hòa đồng", englishExample: "Nam is a sociable boy. / Sociable people make friends easily.", vietnameseExample: "Nam là cậu bé hòa đồng. / Người hòa đồng dễ kết bạn." },
            { english: "generous", vietnamese: "rộng lượng", englishExample: "He is generous with his friends. / My uncle is a generous man.", vietnameseExample: "Cậu ấy hào phóng với bạn. / Chú tôi là người rộng lượng." },
            { english: "helpful", vietnamese: "hay giúp đỡ", englishExample: "My friend is helpful and kind. / Students should be helpful at school.", vietnameseExample: "Bạn tôi rất hay giúp đỡ. / Học sinh nên biết giúp đỡ ở trường." },
            { english: "shy", vietnamese: "nhút nhát", englishExample: "Don’t be shy, just talk to your teacher. / She is too shy to sing in front of the class.", vietnameseExample: "Đừng ngại, hãy nói với cô giáo. / Cô ấy quá nhút nhát để hát trước lớp." },
            { english: "lazy", vietnamese: "lười biếng", englishExample: "He is lazy and never does homework. / Don’t be lazy; do your work!", vietnameseExample: "Cậu ấy lười và không bao giờ làm bài. / Đừng lười, hãy làm việc đi!" },
            { english: "hardworking", vietnamese: "chăm chỉ", englishExample: "She is a hardworking student. / Hardworking people often succeed.", vietnameseExample: "Cô ấy là học sinh chăm chỉ. / Người chăm chỉ thường thành công." },
            { english: "honest", vietnamese: "trung thực", englishExample: "Be honest with your parents. / An honest person always tells the truth.", vietnameseExample: "Hãy trung thực với cha mẹ. / Người trung thực luôn nói thật." },
            { english: "talkative", vietnamese: "hay nói", englishExample: "My sister is very talkative. / Talkative students often get into trouble.", vietnameseExample: "Em gái tôi nói nhiều. / Học sinh nói nhiều thường bị rầy." },
            { english: "quiet", vietnamese: "trầm lặng", englishExample: "He is quiet in class. / Quiet people listen more than they talk.", vietnameseExample: "Cậu ấy ít nói trong lớp. / Người trầm lặng thường lắng nghe nhiều." },
            { english: "polite", vietnamese: "lễ phép", englishExample: "Students should be polite to teachers. / It’s polite to say “thank you”.", vietnameseExample: "Học sinh nên lễ phép với giáo viên. / Nói “cảm ơn” là lịch sự." },
            { english: "rude", vietnamese: "thô lỗ", englishExample: "Don’t be rude to your classmates. / It’s rude to interrupt others.", vietnameseExample: "Đừng thô lỗ với bạn học. / Cắt lời người khác là thô lỗ." }
        ]
    },
    {
        title: "Chủ đề 3 – Appearance & Body Parts",
        words: [
            { english: "tall", vietnamese: "cao", englishExample: "My teacher is very tall. / His brother is tall and thin.", vietnameseExample: "Giáo viên của tôi rất cao. / Anh trai cậu ấy cao và gầy." },
            { english: "short", vietnamese: "thấp", englishExample: "My brother is short but strong. / She is shorter than her sister.", vietnameseExample: "Anh tôi thấp nhưng khỏe. / Cô ấy thấp hơn em gái." },
            { english: "slim", vietnamese: "thon thả, mảnh mai", englishExample: "She is slim and beautiful. / My sister wants to be slim.", vietnameseExample: "Cô ấy mảnh mai và xinh đẹp. / Em gái tôi muốn trở nên thon thả." },
            { english: "thin", vietnamese: "gầy", englishExample: "He looks thin because he doesn’t eat much. / The boy is thin but strong.", vietnameseExample: "Cậu ấy trông gầy vì ăn ít. / Cậu bé gầy nhưng khỏe." },
            { english: "fat", vietnamese: "béo", englishExample: "The cat is too fat. / Don’t eat too much or you’ll get fat.", vietnameseExample: "Con mèo quá béo. / Đừng ăn nhiều kẻo béo." },
            { english: "big", vietnamese: "to, lớn", englishExample: "He has big eyes. / The elephant has big ears.", vietnameseExample: "Cậu ấy có đôi mắt to. / Con voi có đôi tai to." },
            { english: "small", vietnamese: "nhỏ", englishExample: "She has a small nose. / This T-shirt is too small for me.", vietnameseExample: "Cô ấy có cái mũi nhỏ. / Áo này quá nhỏ với tôi." },
            { english: "young", vietnamese: "trẻ", englishExample: "My parents are young and active. / The young girl is very pretty.", vietnameseExample: "Cha mẹ tôi còn trẻ. / Cô gái trẻ rất xinh." },
            { english: "old", vietnamese: "già", englishExample: "My grandfather is very old. / That old man walks slowly.", vietnameseExample: "Ông tôi rất già. / Ông cụ đó đi chậm." },
            { english: "beautiful", vietnamese: "xinh đẹp", englishExample: "She looks beautiful today. / The flowers are beautiful.", vietnameseExample: "Hôm nay cô ấy trông đẹp. / Những bông hoa thật đẹp." },
            { english: "pretty", vietnamese: "dễ thương", englishExample: "Your sister is very pretty. / She has a pretty smile.", vietnameseExample: "Em gái bạn rất dễ thương. / Cô ấy có nụ cười dễ thương." },
            { english: "handsome", vietnamese: "đẹp trai", englishExample: "He is a handsome boy. / Our teacher is tall and handsome.", vietnameseExample: "Cậu ấy đẹp trai. / Thầy giáo của chúng tôi cao và đẹp trai." },
            { english: "ugly", vietnamese: "xấu xí", englishExample: "Don’t call anyone ugly. / That old house looks ugly.", vietnameseExample: "Đừng gọi ai là xấu xí. / Ngôi nhà cũ đó trông xấu." },
            { english: "hair", vietnamese: "tóc", englishExample: "Her hair is long and black. / I brush my hair every morning.", vietnameseExample: "Tóc cô ấy dài và đen. / Tôi chải tóc mỗi sáng." },
            { english: "short hair", vietnamese: "tóc ngắn", englishExample: "He has short hair. / Boys usually have short hair.", vietnameseExample: "Cậu ấy có tóc ngắn. / Con trai thường để tóc ngắn." },
            { english: "long hair", vietnamese: "tóc dài", englishExample: "She has long hair. / Girls often have long hair.", vietnameseExample: "Cô ấy có tóc dài. / Con gái thường để tóc dài." },
            { english: "curly hair", vietnamese: "tóc xoăn", englishExample: "She has curly hair. / Curly hair looks beautiful.", vietnameseExample: "Cô ấy có tóc xoăn. / Tóc xoăn trông đẹp." },
            { english: "straight hair", vietnamese: "tóc thẳng", englishExample: "He likes girls with straight hair. / Her straight hair is very shiny.", vietnameseExample: "Cậu ấy thích tóc thẳng. / Tóc thẳng của cô ấy rất bóng." },
            { english: "eyes", vietnamese: "mắt", englishExample: "He has blue eyes. / My eyes are brown.", vietnameseExample: "Cậu ấy có đôi mắt xanh. / Mắt tôi màu nâu." },
            { english: "nose", vietnamese: "mũi", englishExample: "My nose is small. / She touches her nose.", vietnameseExample: "Mũi tôi nhỏ. / Cô ấy chạm vào mũi." },
            { english: "mouth", vietnamese: "miệng", englishExample: "Open your mouth, please. / The baby is opening his mouth.", vietnameseExample: "Làm ơn há miệng ra. / Em bé đang mở miệng." },
            { english: "lips", vietnamese: "môi", englishExample: "She has full lips. / My lips are dry in winter.", vietnameseExample: "Cô ấy có đôi môi đầy đặn. / Môi tôi bị khô vào mùa đông." },
            { english: "teeth", vietnamese: "răng", englishExample: "Brush your teeth after every meal. / His teeth are white and clean.", vietnameseExample: "Đánh răng sau mỗi bữa ăn. / Răng cậu ấy trắng và sạch." },
            { english: "ears", vietnamese: "tai", englishExample: "His ears are big. / I can hear music with my ears.", vietnameseExample: "Tai cậu ấy to. / Tôi nghe nhạc bằng tai." },
            { english: "face", vietnamese: "khuôn mặt", englishExample: "She has a round face. / His face looks tired.", vietnameseExample: "Cô ấy có khuôn mặt tròn. / Khuôn mặt anh ấy trông mệt." },
            { english: "skin", vietnamese: "da", englishExample: "Her skin is smooth. / People have different skin colors.", vietnameseExample: "Da cô ấy mịn. / Mọi người có màu da khác nhau." },
            { english: "shoulder", vietnamese: "vai", englishExample: "He put his bag on his shoulder. / My shoulder hurts.", vietnameseExample: "Cậu ấy đeo cặp lên vai. / Vai tôi đau." },
            { english: "arm", vietnamese: "cánh tay", englishExample: "Raise your right arm. / He broke his arm.", vietnameseExample: "Giơ tay phải lên. / Cậu ấy bị gãy tay." },
            { english: "hand", vietnamese: "bàn tay", englishExample: "Wash your hands before meals. / She waved her hand.", vietnameseExample: "Rửa tay trước khi ăn. / Cô ấy vẫy tay." },
            { english: "finger", vietnamese: "ngón tay", englishExample: "I hurt my finger. / You can count with your fingers.", vietnameseExample: "Tôi bị đau ngón tay. / Bạn có thể đếm bằng ngón tay." },
            { english: "leg", vietnamese: "chân", englishExample: "My leg is longer than yours. / She fell and hurt her leg.", vietnameseExample: "Chân tôi dài hơn chân bạn. / Cô ấy ngã và bị đau chân." },
            { english: "foot / feet", vietnamese: "bàn chân", englishExample: "My feet are cold. / Wash your feet after playing football.", vietnameseExample: "Chân tôi lạnh. / Rửa chân sau khi chơi bóng." },
            { english: "body", vietnamese: "cơ thể", englishExample: "The human body has many parts. / I take care of my body by doing exercise.", vietnameseExample: "Cơ thể con người có nhiều bộ phận. / Tôi chăm sóc cơ thể bằng cách tập thể dục." },
            { english: "head", vietnamese: "đầu", englishExample: "Cover your head with a hat. / My head hurts.", vietnameseExample: "Đội mũ lên đầu. / Đầu tôi đau." },
            { english: "neck", vietnamese: "cổ", englishExample: "I wear a scarf around my neck. / The giraffe has a long neck.", vietnameseExample: "Tôi quàng khăn quanh cổ. / Hươu cao cổ có cái cổ dài." },
            { english: "knee", vietnamese: "đầu gối", englishExample: "He hurt his knee while playing. / Bend your knees when you jump.", vietnameseExample: "Cậu ấy bị đau đầu gối khi chơi. / Gập gối khi nhảy." },
            { english: "toe", vietnamese: "ngón chân", englishExample: "I hit my toe on the door. / He has ten toes.", vietnameseExample: "Tôi bị đập ngón chân vào cửa. / Cậu ấy có mười ngón chân." },
            { english: "look", vietnamese: "trông, nhìn", englishExample: "You look tired today. / Look at the board, please.", vietnameseExample: "Hôm nay bạn trông mệt. / Hãy nhìn lên bảng." },
            { english: "look like", vietnamese: "trông giống", englishExample: "You look like your mother. / What does he look like?", vietnameseExample: "Bạn trông giống mẹ. / Anh ấy trông thế nào?" },
            { english: "be good-looking", vietnamese: "ưa nhìn", englishExample: "He is tall and good-looking. / Many actors are good-looking.", vietnameseExample: "Cậu ấy cao và ưa nhìn. / Nhiều diễn viên đẹp trai." },
            { english: "have", vietnamese: "có", englishExample: "She has long black hair. / He has big brown eyes.", vietnameseExample: "Cô ấy có tóc dài màu đen. / Cậu ấy có đôi mắt to màu nâu." },
            { english: "wear", vietnamese: "mặc / mang / đeo", englishExample: "She wears glasses. / Students wear uniforms at school.", vietnameseExample: "Cô ấy đeo kính. / Học sinh mặc đồng phục ở trường." },
            { english: "glasses", vietnamese: "kính mắt", englishExample: "I wear glasses to read. / His glasses are on the table.", vietnameseExample: "Tôi đeo kính để đọc. / Kính của cậu ấy ở trên bàn." },
            { english: "strong", vietnamese: "khỏe mạnh", englishExample: "A weight lifter must be strong. / He is strong enough to lift that box.", vietnameseExample: "Vận động viên cử tạ phải khỏe. / Cậu ấy đủ khỏe để nhấc hộp đó." },
            { english: "weak", vietnamese: "yếu", englishExample: "The baby is too weak to walk. / You’ll feel weak if you don’t eat.", vietnameseExample: "Em bé quá yếu để đi. / Bạn sẽ cảm thấy yếu nếu không ăn." },
            { english: "smile", vietnamese: "mỉm cười", englishExample: "She smiles every morning. / Her smile is beautiful.", vietnameseExample: "Cô ấy mỉm cười mỗi sáng. / Nụ cười của cô ấy rất đẹp." },
            { english: "describe", vietnamese: "miêu tả", englishExample: "Can you describe your best friend? / We learn to describe people in English.", vietnameseExample: "Bạn có thể miêu tả bạn thân không? / Chúng tôi học cách miêu tả người bằng tiếng Anh." },
            { english: "take care of", vietnamese: "chăm sóc", englishExample: "She takes care of her little brother. / Parents take care of their children.", vietnameseExample: "Cô ấy chăm em trai. / Cha mẹ chăm sóc con cái." },
            { english: "look after", vietnamese: "trông nom, chăm sóc", englishExample: "I look after my grandparents on weekends. / She looks after the baby when her mom is away.", vietnameseExample: "Tôi trông ông bà cuối tuần. / Cô ấy trông em bé khi mẹ vắng." },
            { english: "get along with", vietnamese: "hòa hợp với", englishExample: "I get along with my classmates. / Do you get along with your sister?", vietnameseExample: "Tôi hòa hợp với bạn cùng lớp. / Bạn có hòa thuận với em gái không?" }
        ]
    },
    {
        title: "Chủ đề 4 – Daily Routines & Time",
        words: [
            { english: "get up", vietnamese: "thức dậy", englishExample: "I get up at six o’clock. / He gets up early every morning.", vietnameseExample: "Tôi thức dậy lúc 6 giờ. / Cậu ấy dậy sớm mỗi sáng." },
            { english: "wake up", vietnamese: "tỉnh giấc", englishExample: "She wakes up at 5:30. / I wake up when my alarm rings.", vietnameseExample: "Cô ấy tỉnh giấc lúc 5:30. / Tôi tỉnh giấc khi đồng hồ reo." },
            { english: "brush teeth", vietnamese: "đánh răng", englishExample: "I brush my teeth after breakfast. / Children should brush their teeth twice a day.", vietnameseExample: "Tôi đánh răng sau bữa sáng. / Trẻ em nên đánh răng hai lần mỗi ngày." },
            { english: "wash face", vietnamese: "rửa mặt", englishExample: "He washes his face with cold water. / I wash my face every morning.", vietnameseExample: "Cậu ấy rửa mặt bằng nước lạnh. / Tôi rửa mặt mỗi sáng." },
            { english: "take a shower", vietnamese: "tắm (vòi sen)", englishExample: "I take a shower before school. / She takes a shower every evening.", vietnameseExample: "Tôi tắm trước khi đi học. / Cô ấy tắm mỗi tối." },
            { english: "have breakfast", vietnamese: "ăn sáng", englishExample: "I have breakfast with my family. / What do you have for breakfast?", vietnameseExample: "Tôi ăn sáng cùng gia đình. / Bạn ăn gì cho bữa sáng?" },
            { english: "have lunch", vietnamese: "ăn trưa", englishExample: "We have lunch at school. / She has lunch with her friends.", vietnameseExample: "Chúng tôi ăn trưa ở trường. / Cô ấy ăn trưa cùng bạn." },
            { english: "have dinner", vietnamese: "ăn tối", englishExample: "My family has dinner at 7 p.m. / We always have dinner together.", vietnameseExample: "Gia đình tôi ăn tối lúc 7 giờ. / Chúng tôi luôn ăn tối cùng nhau." },
            { english: "go to school", vietnamese: "đi học", englishExample: "I go to school at 7 a.m. / They go to school by bike.", vietnameseExample: "Tôi đi học lúc 7 giờ. / Họ đi học bằng xe đạp." },
            { english: "go home", vietnamese: "về nhà", englishExample: "I go home at 4 p.m. / We go home after class.", vietnameseExample: "Tôi về nhà lúc 4 giờ. / Chúng tôi về nhà sau khi học xong." },
            { english: "go to bed", vietnamese: "đi ngủ", englishExample: "I go to bed at 10 p.m. / He never goes to bed late.", vietnameseExample: "Tôi đi ngủ lúc 10 giờ. / Cậu ấy không bao giờ ngủ muộn." },
            { english: "do homework", vietnamese: "làm bài tập", englishExample: "I do my homework after dinner. / She is doing her homework now.", vietnameseExample: "Tôi làm bài tập sau bữa tối. / Cô ấy đang làm bài tập." },
            { english: "get dressed", vietnamese: "mặc quần áo", englishExample: "I get dressed before breakfast. / He gets dressed quickly in the morning.", vietnameseExample: "Tôi mặc đồ trước khi ăn sáng. / Cậu ấy thay đồ nhanh vào buổi sáng." },
            { english: "comb hair", vietnamese: "chải tóc", englishExample: "She combs her hair before going to school. / I always comb my hair neatly.", vietnameseExample: "Cô ấy chải tóc trước khi đi học. / Tôi luôn chải tóc gọn gàng." },
            { english: "go out", vietnamese: "ra ngoài", englishExample: "We go out on Sundays. / Let’s go out for a walk.", vietnameseExample: "Chúng tôi ra ngoài vào Chủ nhật. / Hãy ra ngoài đi dạo." },
            { english: "play sports", vietnamese: "chơi thể thao", englishExample: "I play sports in the afternoon. / My friends play sports after school.", vietnameseExample: "Tôi chơi thể thao buổi chiều. / Bạn tôi chơi thể thao sau giờ học." },
            { english: "play football", vietnamese: "chơi bóng đá", englishExample: "We play football at break time. / Boys often play football in the yard.", vietnameseExample: "Chúng tôi chơi bóng lúc ra chơi. / Con trai thường đá bóng ngoài sân." },
            { english: "watch TV", vietnamese: "xem tivi", englishExample: "I watch TV in the evening. / My grandparents watch TV after dinner.", vietnameseExample: "Tôi xem TV buổi tối. / Ông bà tôi xem TV sau bữa tối." },
            { english: "listen to music", vietnamese: "nghe nhạc", englishExample: "I listen to music every night. / She listens to pop music.", vietnameseExample: "Tôi nghe nhạc mỗi tối. / Cô ấy nghe nhạc pop." },
            { english: "read books", vietnamese: "đọc sách", englishExample: "He reads books before bedtime. / I like reading English books.", vietnameseExample: "Cậu ấy đọc sách trước khi ngủ. / Tôi thích đọc sách tiếng Anh." },
            { english: "do the housework", vietnamese: "làm việc nhà", englishExample: "I do the housework at weekends. / My mother does most of the housework.", vietnameseExample: "Tôi làm việc nhà cuối tuần. / Mẹ tôi làm hầu hết việc nhà." },
            { english: "cook", vietnamese: "nấu ăn", englishExample: "My mother cooks dinner every day. / I can cook noodles.", vietnameseExample: "Mẹ tôi nấu bữa tối hằng ngày. / Tôi có thể nấu mì." },
            { english: "clean", vietnamese: "dọn dẹp", englishExample: "We clean the classroom together. / I clean my room on Sunday.", vietnameseExample: "Chúng tôi dọn lớp cùng nhau. / Tôi dọn phòng vào Chủ nhật." },
            { english: "feed", vietnamese: "cho ăn", englishExample: "I feed the cat every morning. / He feeds the chickens after school.", vietnameseExample: "Tôi cho mèo ăn mỗi sáng. / Cậu ấy cho gà ăn sau giờ học." },
            { english: "walk", vietnamese: "đi bộ", englishExample: "I walk to school every day. / Let’s walk to the park.", vietnameseExample: "Tôi đi bộ đến trường mỗi ngày. / Hãy đi bộ đến công viên." },
            { english: "ride a bike", vietnamese: "đi xe đạp", englishExample: "I ride my bike to school. / We often ride bikes in the park.", vietnameseExample: "Tôi đạp xe đến trường. / Chúng tôi thường đạp xe trong công viên." },
            { english: "take a bus", vietnamese: "đi xe buýt", englishExample: "She takes a bus to school. / We take a bus to the city center.", vietnameseExample: "Cô ấy đi học bằng xe buýt. / Chúng tôi đi xe buýt đến trung tâm." },
            { english: "study", vietnamese: "học tập", englishExample: "He studies hard for the IOE exam. / We study English every day.", vietnameseExample: "Cậu ấy học chăm cho kỳ thi IOE. / Chúng tôi học tiếng Anh mỗi ngày." },
            { english: "review / revise", vietnamese: "ôn tập", englishExample: "We revise lessons before the test. / She reviews her notes carefully.", vietnameseExample: "Chúng tôi ôn bài trước khi kiểm tra. / Cô ấy ôn kỹ ghi chú." },
            { english: "finish", vietnamese: "hoàn thành / kết thúc", englishExample: "School finishes at 4:30. / I finish my homework before dinner.", vietnameseExample: "Trường tan học lúc 4:30. / Tôi làm xong bài trước bữa tối." },
            { english: "start / begin", vietnamese: "bắt đầu", englishExample: "Classes start at 7 a.m. / The lesson begins with a song.", vietnameseExample: "Tiết học bắt đầu lúc 7 giờ. / Bài học bắt đầu bằng một bài hát." },
            { english: "arrive", vietnamese: "đến", englishExample: "I arrive at school early. / She arrives home at 5 p.m.", vietnameseExample: "Tôi đến trường sớm. / Cô ấy về nhà lúc 5 giờ." },
            { english: "leave", vietnamese: "rời đi", englishExample: "We leave home at 6:30. / He leaves school late.", vietnameseExample: "Chúng tôi rời nhà lúc 6:30. / Cậu ấy rời trường muộn." },
            { english: "late", vietnamese: "muộn", englishExample: "Don’t be late for class. / I was late this morning.", vietnameseExample: "Đừng đi học trễ. / Sáng nay tôi bị trễ." },
            { english: "early", vietnamese: "sớm", englishExample: "I get up early every day. / He comes to class early.", vietnameseExample: "Tôi dậy sớm mỗi ngày. / Cậu ấy đến lớp sớm." },
            { english: "always", vietnamese: "luôn luôn", englishExample: "She always does her homework. / I always help my mom.", vietnameseExample: "Cô ấy luôn làm bài tập. / Tôi luôn giúp mẹ." },
            { english: "usually", vietnamese: "thường xuyên", englishExample: "I usually go to bed at ten. / We usually eat breakfast together.", vietnameseExample: "Tôi thường ngủ lúc 10 giờ. / Chúng tôi thường ăn sáng cùng nhau." },
            { english: "sometimes", vietnamese: "đôi khi", englishExample: "He sometimes watches TV after dinner. / I sometimes help my dad.", vietnameseExample: "Cậu ấy đôi khi xem TV sau bữa tối. / Tôi đôi khi giúp bố." },
            { english: "never", vietnamese: "không bao giờ", englishExample: "She never goes to school late. / I never eat breakfast.", vietnameseExample: "Cô ấy không bao giờ đi học trễ. / Tôi không bao giờ ăn sáng." },
            { english: "often", vietnamese: "thường", englishExample: "We often play football at break time. / My father often reads newspapers.", vietnameseExample: "Chúng tôi thường chơi bóng lúc ra chơi. / Bố tôi thường đọc báo." },
            { english: "time", vietnamese: "thời gian", englishExample: "What time is it now? / Time flies so fast.", vietnameseExample: "Bây giờ mấy giờ rồi? / Thời gian trôi nhanh quá." },
            { english: "o’clock", vietnamese: "giờ chẵn", englishExample: "I go to school at seven o’clock. / It’s nine o’clock now.", vietnameseExample: "Tôi đi học lúc 7 giờ. / Bây giờ là 9 giờ." },
            { english: "half past", vietnamese: "rưỡi (giờ)", englishExample: "It’s half past six. / I wake up at half past five.", vietnameseExample: "Bây giờ là 6 rưỡi. / Tôi dậy lúc 5 rưỡi." },
            { english: "quarter past", vietnamese: "hơn 15 phút", englishExample: "It’s quarter past nine. / The class starts at a quarter past seven.", vietnameseExample: "Bây giờ là 9 giờ 15. / Tiết học bắt đầu lúc 7 giờ 15." },
            { english: "quarter to", vietnamese: "kém 15 phút", englishExample: "It’s quarter to eight. / I have breakfast at a quarter to seven.", vietnameseExample: "Bây giờ là 7 giờ 45. / Tôi ăn sáng lúc 6 giờ 45." },
            { english: "in the morning", vietnamese: "vào buổi sáng", englishExample: "I study English in the morning. / She runs in the morning.", vietnameseExample: "Tôi học tiếng Anh buổi sáng. / Cô ấy chạy bộ buổi sáng." },
            { english: "in the afternoon", vietnamese: "vào buổi chiều", englishExample: "We play badminton in the afternoon. / I watch TV in the afternoon.", vietnameseExample: "Chúng tôi chơi cầu lông buổi chiều. / Tôi xem TV buổi chiều." },
            { english: "in the evening", vietnamese: "vào buổi tối", englishExample: "I do homework in the evening. / My family watches TV in the evening.", vietnameseExample: "Tôi làm bài tập buổi tối. / Gia đình tôi xem TV buổi tối." },
            { english: "at night", vietnamese: "vào ban đêm", englishExample: "I read books at night. / He studies at night.", vietnameseExample: "Tôi đọc sách ban đêm. / Cậu ấy học vào ban đêm." }
        ]
    },
    {
        title: "Chủ đề 5 – Food & Drinks",
        words: [
            { english: "food", vietnamese: "thức ăn", englishExample: "We need food to live. / Fast food is not healthy.", vietnameseExample: "Chúng ta cần thức ăn để sống. / Đồ ăn nhanh không tốt cho sức khỏe." },
            { english: "drink", vietnamese: "đồ uống / uống", englishExample: "What would you like to drink? / I drink milk every morning.", vietnameseExample: "Bạn muốn uống gì? / Tôi uống sữa mỗi sáng." },
            { english: "breakfast", vietnamese: "bữa sáng", englishExample: "I have breakfast at 6:30. / Breakfast is the most important meal.", vietnameseExample: "Tôi ăn sáng lúc 6:30. / Bữa sáng là bữa ăn quan trọng nhất." },
            { english: "lunch", vietnamese: "bữa trưa", englishExample: "We have lunch at school. / What do you have for lunch?", vietnameseExample: "Chúng tôi ăn trưa ở trường. / Bạn ăn gì cho bữa trưa?" },
            { english: "dinner", vietnamese: "bữa tối", englishExample: "My family has dinner at 7 p.m. / We often eat rice for dinner.", vietnameseExample: "Gia đình tôi ăn tối lúc 7 giờ. / Chúng tôi thường ăn cơm vào bữa tối." },
            { english: "meal", vietnamese: "bữa ăn", englishExample: "There are three main meals a day. / I help my mother prepare meals.", vietnameseExample: "Một ngày có ba bữa chính. / Tôi giúp mẹ chuẩn bị bữa ăn." },
            { english: "rice", vietnamese: "cơm / gạo", englishExample: "Vietnamese people eat rice every day. / We have rice and fish for lunch.", vietnameseExample: "Người Việt ăn cơm mỗi ngày. / Chúng tôi ăn cơm và cá cho bữa trưa." },
            { english: "noodles", vietnamese: "mì", englishExample: "I like chicken noodles. / Would you like some noodles?", vietnameseExample: "Tôi thích mì gà. / Bạn có muốn ăn mì không?" },
            { english: "soup", vietnamese: "súp / canh", englishExample: "My mom cooks tomato soup. / I have soup for dinner.", vietnameseExample: "Mẹ tôi nấu súp cà chua. / Tôi ăn súp cho bữa tối." },
            { english: "bread", vietnamese: "bánh mì", englishExample: "I eat bread and eggs for breakfast. / We bought a loaf of bread.", vietnameseExample: "Tôi ăn bánh mì và trứng cho bữa sáng. / Chúng tôi mua một ổ bánh mì." },
            { english: "egg", vietnamese: "trứng", englishExample: "He eats two eggs every morning. / I can fry an egg.", vietnameseExample: "Cậu ấy ăn hai quả trứng mỗi sáng. / Tôi có thể chiên trứng." },
            { english: "meat", vietnamese: "thịt", englishExample: "We need meat for lunch. / I don’t eat much meat.", vietnameseExample: "Chúng tôi cần thịt cho bữa trưa. / Tôi không ăn nhiều thịt." },
            { english: "chicken", vietnamese: "thịt gà / con gà", englishExample: "I like fried chicken. / My mother cooks chicken soup.", vietnameseExample: "Tôi thích gà rán. / Mẹ tôi nấu súp gà." },
            { english: "pork", vietnamese: "thịt heo", englishExample: "He doesn’t eat pork. / Pork is cheaper than beef.", vietnameseExample: "Cậu ấy không ăn thịt heo. / Thịt heo rẻ hơn thịt bò." },
            { english: "beef", vietnamese: "thịt bò", englishExample: "We had beef for dinner. / Beef is my favorite meat.", vietnameseExample: "Chúng tôi ăn thịt bò cho bữa tối. / Thịt bò là món tôi thích." },
            { english: "fish", vietnamese: "cá", englishExample: "Fish is good for your health. / My father catches fish in the river.", vietnameseExample: "Cá tốt cho sức khỏe. / Bố tôi bắt cá ở sông." },
            { english: "vegetable", vietnamese: "rau củ", englishExample: "I eat a lot of vegetables. / Vegetables are good for you.", vietnameseExample: "Tôi ăn nhiều rau củ. / Rau củ tốt cho bạn." },
            { english: "carrot", vietnamese: "cà rốt", englishExample: "Rabbits like carrots. / She cut the carrots into pieces.", vietnameseExample: "Thỏ thích cà rốt. / Cô ấy cắt cà rốt thành miếng." },
            { english: "tomato", vietnamese: "cà chua", englishExample: "Tomatoes are red and round. / I don’t like tomato juice.", vietnameseExample: "Cà chua có màu đỏ và tròn. / Tôi không thích nước ép cà chua." },
            { english: "cucumber", vietnamese: "dưa leo", englishExample: "Cucumber salad is tasty. / I eat cucumbers every day.", vietnameseExample: "Salad dưa leo rất ngon. / Tôi ăn dưa leo mỗi ngày." },
            { english: "fruit", vietnamese: "trái cây", englishExample: "Fruit is good for your body. / We eat fruit after meals.", vietnameseExample: "Trái cây tốt cho cơ thể. / Chúng tôi ăn trái cây sau bữa ăn." },
            { english: "apple", vietnamese: "táo", englishExample: "I eat an apple a day. / Apples are my favorite fruit.", vietnameseExample: "Tôi ăn một quả táo mỗi ngày. / Táo là loại trái cây tôi thích nhất." },
            { english: "banana", vietnamese: "chuối", englishExample: "Monkeys like bananas. / I have a banana for breakfast.", vietnameseExample: "Khỉ thích chuối. / Tôi ăn một quả chuối cho bữa sáng." },
            { english: "orange", vietnamese: "cam", englishExample: "I drink a glass of orange juice. / Orange juice is rich in vitamin C.", vietnameseExample: "Tôi uống một ly nước cam. / Nước cam chứa nhiều vitamin C." },
            { english: "mango", vietnamese: "xoài", englishExample: "I love ripe mangoes. / She makes mango juice.", vietnameseExample: "Tôi thích xoài chín. / Cô ấy làm nước ép xoài." },
            { english: "watermelon", vietnamese: "dưa hấu", englishExample: "We eat watermelon in summer. / Watermelon is sweet and fresh.", vietnameseExample: "Chúng tôi ăn dưa hấu vào mùa hè. / Dưa hấu ngọt và mát." },
            { english: "water", vietnamese: "nước", englishExample: "I need a glass of water. / Water is important for life.", vietnameseExample: "Tôi cần một ly nước. / Nước rất quan trọng cho sự sống." },
            { english: "milk", vietnamese: "sữa", englishExample: "I drink milk in the morning. / Milk helps children grow.", vietnameseExample: "Tôi uống sữa vào buổi sáng. / Sữa giúp trẻ em phát triển." },
            { english: "juice", vietnamese: "nước ép", englishExample: "Would you like some orange juice? / Apple juice is sweet.", vietnameseExample: "Bạn có muốn nước cam không? / Nước ép táo rất ngọt." },
            { english: "tea", vietnamese: "trà", englishExample: "My father drinks tea every morning. / Would you like some hot tea?", vietnameseExample: "Bố tôi uống trà mỗi sáng. / Bạn có muốn uống trà nóng không?" },
            { english: "coffee", vietnamese: "cà phê", englishExample: "She drinks coffee after lunch. / Coffee keeps me awake.", vietnameseExample: "Cô ấy uống cà phê sau bữa trưa. / Cà phê giúp tôi tỉnh táo." },
            { english: "soda", vietnamese: "nước ngọt có ga", englishExample: "Don’t drink too much soda. / I like lemon soda.", vietnameseExample: "Đừng uống quá nhiều nước ngọt. / Tôi thích soda chanh." },
            { english: "sugar", vietnamese: "đường", englishExample: "Don’t add too much sugar. / Sugar makes the drink sweet.", vietnameseExample: "Đừng cho quá nhiều đường. / Đường làm đồ uống ngọt." },
            { english: "salt", vietnamese: "muối", englishExample: "Add a little salt to the soup. / Salt is used in almost every dish.", vietnameseExample: "Cho một chút muối vào súp. / Muối được dùng trong hầu hết món ăn." },
            { english: "sweet", vietnamese: "ngọt / kẹo", englishExample: "I like sweet food. / She bought some sweets.", vietnameseExample: "Tôi thích đồ ngọt. / Cô ấy mua vài viên kẹo." },
            { english: "spicy", vietnamese: "cay", englishExample: "This soup is too spicy. / I can’t eat spicy food.", vietnameseExample: "Món súp này cay quá. / Tôi không ăn được đồ cay." },
            { english: "delicious", vietnamese: "ngon miệng", englishExample: "The noodles are delicious. / This cake tastes delicious.", vietnameseExample: "Mì này rất ngon. / Cái bánh này ngon tuyệt." },
            { english: "tasty", vietnamese: "ngon", englishExample: "The chicken is tasty. / That’s a very tasty meal.", vietnameseExample: "Món gà rất ngon. / Đó là bữa ăn ngon miệng." },
            { english: "healthy", vietnamese: "tốt cho sức khỏe", englishExample: "Eating vegetables is healthy. / Water is healthy for everyone.", vietnameseExample: "Ăn rau tốt cho sức khỏe. / Nước tốt cho mọi người." },
            { english: "unhealthy", vietnamese: "không tốt cho sức khỏe", englishExample: "Fast food is unhealthy. / Don’t eat too much junk food; it’s unhealthy.", vietnameseExample: "Đồ ăn nhanh không tốt. / Đừng ăn quá nhiều đồ ăn vặt." },
            { english: "hungry", vietnamese: "đói", englishExample: "I’m very hungry now. / The children are hungry after playing.", vietnameseExample: "Tôi đang rất đói. / Bọn trẻ đói sau khi chơi." },
            { english: "thirsty", vietnamese: "khát", englishExample: "I’m thirsty. Can I have some water? / He felt thirsty after running.", vietnameseExample: "Tôi khát, cho tôi ít nước được không? / Cậu ấy khát sau khi chạy." },
            { english: "full", vietnamese: "no / đầy", englishExample: "I’m full, thank you. / Don’t eat too much or you’ll be full.", vietnameseExample: "Tôi no rồi, cảm ơn. / Đừng ăn quá nhiều kẻo no." },
            { english: "cook", vietnamese: "nấu ăn", englishExample: "My mom cooks very well. / I can cook fried rice.", vietnameseExample: "Mẹ tôi nấu ăn rất ngon. / Tôi có thể nấu cơm chiên." },
            { english: "chef", vietnamese: "đầu bếp", englishExample: "The chef works in a restaurant. / He wants to be a chef.", vietnameseExample: "Đầu bếp làm việc trong nhà hàng. / Cậu ấy muốn làm đầu bếp." },
            { english: "restaurant", vietnamese: "nhà hàng", englishExample: "We have dinner at a restaurant. / This restaurant is very famous.", vietnameseExample: "Chúng tôi ăn tối ở nhà hàng. / Nhà hàng này rất nổi tiếng." },
            { english: "waiter / waitress", vietnamese: "phục vụ nam / nữ", englishExample: "The waiter brings our food. / The waitress is very polite.", vietnameseExample: "Người phục vụ mang thức ăn ra. / Nữ phục vụ rất lịch sự." },
            { english: "order", vietnamese: "gọi món", englishExample: "Let’s order some pizza. / What do you want to order?", vietnameseExample: "Hãy gọi vài chiếc pizza. / Bạn muốn gọi món gì?" },
            { english: "menu", vietnamese: "thực đơn", englishExample: "Can I see the menu, please? / The menu has many dishes.", vietnameseExample: "Cho tôi xem thực đơn được không? / Thực đơn có nhiều món." },
            { english: "dish", vietnamese: "món ăn", englishExample: "My favorite dish is fried rice. / There are many dishes on the menu.", vietnameseExample: "Món ăn tôi thích là cơm chiên. / Có nhiều món trong thực đơn." },
            { english: "fork", vietnamese: "nĩa", englishExample: "I eat spaghetti with a fork. / Where’s my fork?", vietnameseExample: "Tôi ăn mì bằng nĩa. / Cây nĩa của tôi đâu rồi?" },
            { english: "spoon", vietnamese: "muỗng", englishExample: "Please use your spoon. / This soup needs a spoon.", vietnameseExample: "Làm ơn dùng muỗng. / Món súp này cần muỗng." },
            { english: "chopsticks", vietnamese: "đũa", englishExample: "We eat rice with chopsticks. / Can you use chopsticks?", vietnameseExample: "Chúng tôi ăn cơm bằng đũa. / Bạn biết dùng đũa không?" }
        ]
    },
    {
        title: "Chủ đề 6 – Weather & Seasons",
        words: [
            { english: "weather", vietnamese: "thời tiết", englishExample: "What’s the weather like today? / The weather is nice and cool.", vietnameseExample: "Thời tiết hôm nay thế nào? / Thời tiết thật dễ chịu và mát." },
            { english: "sunny", vietnamese: "có nắng", englishExample: "It’s sunny today. / We go to the park on sunny days.", vietnameseExample: "Hôm nay trời nắng. / Chúng tôi đi công viên vào ngày nắng." },
            { english: "rainy", vietnamese: "có mưa", englishExample: "It’s rainy and cold. / Don’t forget your umbrella; it’s rainy outside.", vietnameseExample: "Trời có mưa và lạnh. / Đừng quên ô, bên ngoài đang mưa." },
            { english: "cloudy", vietnamese: "có mây", englishExample: "The sky is cloudy. / It looks cloudy this morning.", vietnameseExample: "Bầu trời nhiều mây. / Sáng nay trời có vẻ âm u." },
            { english: "windy", vietnamese: "có gió", englishExample: "It’s windy today. / A windy day is good for flying kites.", vietnameseExample: "Hôm nay trời có gió. / Ngày có gió thì thả diều rất vui." },
            { english: "stormy", vietnamese: "có bão", englishExample: "It’s stormy in summer. / Don’t go out on a stormy night.", vietnameseExample: "Mùa hè có bão. / Đừng ra ngoài vào đêm có bão." },
            { english: "foggy", vietnamese: "có sương mù", englishExample: "It’s foggy in the early morning. / I can’t see the road because it’s foggy.", vietnameseExample: "Trời có sương mù vào sáng sớm. / Tôi không thấy đường vì trời nhiều sương." },
            { english: "snowy", vietnamese: "có tuyết", englishExample: "It’s snowy in winter. / We make snowmen on snowy days.", vietnameseExample: "Trời có tuyết vào mùa đông. / Chúng tôi làm người tuyết vào ngày có tuyết." },
            { english: "hot", vietnamese: "nóng", englishExample: "It’s hot in July. / I feel hot; let’s open the window.", vietnameseExample: "Trời nóng vào tháng Bảy. / Tôi thấy nóng, mở cửa sổ đi." },
            { english: "warm", vietnamese: "ấm áp", englishExample: "It’s warm in spring. / I like the warm sunshine.", vietnameseExample: "Trời ấm vào mùa xuân. / Tôi thích ánh nắng ấm." },
            { english: "cool", vietnamese: "mát mẻ", englishExample: "It’s cool today. / The air is cool after the rain.", vietnameseExample: "Hôm nay trời mát. / Không khí mát sau cơn mưa." },
            { english: "cold", vietnamese: "lạnh", englishExample: "It’s cold in December. / Wear your coat; it’s cold outside.", vietnameseExample: "Tháng Mười Hai trời lạnh. / Mặc áo khoác vào, ngoài trời lạnh lắm." },
            { english: "dry", vietnamese: "khô ráo", englishExample: "The weather is dry this month. / My skin is dry in winter.", vietnameseExample: "Thời tiết tháng này khô. / Da tôi bị khô vào mùa đông." },
            { english: "wet", vietnamese: "ẩm ướt", englishExample: "It’s wet after the rain. / Be careful; the floor is wet.", vietnameseExample: "Trời ẩm sau cơn mưa. / Cẩn thận, sàn nhà ướt đấy." },
            { english: "temperature", vietnamese: "nhiệt độ", englishExample: "The temperature is thirty degrees. / The temperature drops at night.", vietnameseExample: "Nhiệt độ là 30 độ. / Nhiệt độ giảm vào ban đêm." },
            { english: "season", vietnamese: "mùa", englishExample: "There are four seasons in a year. / What season do you like best?", vietnameseExample: "Một năm có bốn mùa. / Bạn thích mùa nào nhất?" },
            { english: "spring", vietnamese: "mùa xuân", englishExample: "Flowers bloom in spring. / Spring is warm and beautiful.", vietnameseExample: "Hoa nở vào mùa xuân. / Mùa xuân ấm áp và đẹp." },
            { english: "summer", vietnamese: "mùa hè", englishExample: "Summer is hot and sunny. / We go swimming in summer.", vietnameseExample: "Mùa hè nóng và có nắng. / Chúng tôi đi bơi vào mùa hè." },
            { english: "autumn (fall)", vietnamese: "mùa thu", englishExample: "Autumn is cool and windy. / Leaves fall in autumn.", vietnameseExample: "Mùa thu mát mẻ và có gió. / Lá rụng vào mùa thu." },
            { english: "winter", vietnamese: "mùa đông", englishExample: "It’s cold in winter. / We wear coats in winter.", vietnameseExample: "Mùa đông trời lạnh. / Chúng tôi mặc áo khoác vào mùa đông." },
            { english: "degree", vietnamese: "độ (nhiệt độ)", englishExample: "It’s 30 degrees today. / The water is 25 degrees Celsius.", vietnameseExample: "Hôm nay 30 độ. / Nước có nhiệt độ 25 độ C." },
            { english: "rainbow", vietnamese: "cầu vồng", englishExample: "Look! There’s a rainbow! / The rainbow appears after the rain.", vietnameseExample: "Nhìn kìa! Có cầu vồng! / Cầu vồng xuất hiện sau cơn mưa." },
            { english: "sun", vietnamese: "mặt trời", englishExample: "The sun is shining. / Don’t look at the sun.", vietnameseExample: "Mặt trời đang chiếu sáng. / Đừng nhìn vào mặt trời." },
            { english: "sky", vietnamese: "bầu trời", englishExample: "The sky is blue. / Birds are flying in the sky.", vietnameseExample: "Bầu trời màu xanh. / Chim đang bay trên trời." },
            { english: "cloud", vietnamese: "đám mây", englishExample: "There are many clouds today. / A big cloud is moving fast.", vietnameseExample: "Hôm nay có nhiều mây. / Một đám mây lớn đang trôi nhanh." },
            { english: "rain", vietnamese: "mưa", englishExample: "It often rains in autumn. / Heavy rain is falling now.", vietnameseExample: "Mùa thu thường có mưa. / Mưa lớn đang rơi." },
            { english: "snow", vietnamese: "tuyết", englishExample: "It snows in the north. / Children play with snow.", vietnameseExample: "Trời có tuyết ở miền Bắc. / Trẻ con chơi với tuyết." },
            { english: "wind", vietnamese: "gió", englishExample: "The wind is very strong. / I can hear the wind outside.", vietnameseExample: "Gió rất mạnh. / Tôi nghe tiếng gió bên ngoài." },
            { english: "storm", vietnamese: "bão", englishExample: "The storm is coming. / A big storm hit the city last night.", vietnameseExample: "Cơn bão đang đến. / Cơn bão lớn đổ bộ đêm qua." },
            { english: "fog", vietnamese: "sương mù", englishExample: "There is thick fog this morning. / The fog covers the road.", vietnameseExample: "Sáng nay có sương dày. / Sương che phủ con đường." },
            { english: "umbrella", vietnamese: "ô, dù", englishExample: "Don’t forget your umbrella! / I have a blue umbrella.", vietnameseExample: "Đừng quên mang ô! / Tôi có chiếc ô màu xanh." },
            { english: "raincoat", vietnamese: "áo mưa", englishExample: "Take your raincoat with you. / I wear a raincoat when it rains.", vietnameseExample: "Mang áo mưa theo. / Tôi mặc áo mưa khi trời mưa." },
            { english: "boots", vietnamese: "ủng", englishExample: "I wear boots in the rain. / These boots keep my feet warm.", vietnameseExample: "Tôi mang ủng khi trời mưa. / Đôi ủng này giữ ấm chân tôi." },
            { english: "scarf", vietnamese: "khăn choàng", englishExample: "I wear a scarf in winter. / This scarf is very soft.", vietnameseExample: "Tôi đeo khăn choàng mùa đông. / Chiếc khăn này rất mềm." },
            { english: "coat", vietnamese: "áo khoác", englishExample: "Put on your coat; it’s cold. / My coat is on the chair.", vietnameseExample: "Mặc áo khoác vào, trời lạnh đấy. / Áo khoác của tôi ở trên ghế." },
            { english: "hat", vietnamese: "mũ", englishExample: "He wears a hat on sunny days. / I bought a new hat.", vietnameseExample: "Cậu ấy đội mũ vào ngày nắng. / Tôi mua một chiếc mũ mới." },
            { english: "gloves", vietnamese: "găng tay", englishExample: "I wear gloves when it’s cold. / These gloves are very warm.", vietnameseExample: "Tôi mang găng khi trời lạnh. / Găng tay này rất ấm." },
            { english: "weather forecast", vietnamese: "dự báo thời tiết", englishExample: "Let’s watch the weather forecast. / The weather forecast says it will rain tomorrow.", vietnameseExample: "Hãy xem dự báo thời tiết. / Dự báo nói ngày mai sẽ mưa." },
            { english: "what’s the weather like?", vietnamese: "thời tiết thế nào?", englishExample: "What’s the weather like in Hanoi today? / What’s the weather like in your country?", vietnameseExample: "Thời tiết Hà Nội hôm nay thế nào? / Ở nước bạn thời tiết ra sao?" },
            { english: "how’s the weather?", vietnamese: "thời tiết ra sao?", englishExample: "How’s the weather there? / How’s the weather in winter?", vietnameseExample: "Thời tiết ở đó ra sao? / Thời tiết mùa đông thế nào?" },
            { english: "favorite season", vietnamese: "mùa yêu thích", englishExample: "My favorite season is spring. / What’s your favorite season?", vietnameseExample: "Mùa tôi thích là mùa xuân. / Mùa bạn thích là gì?" },
            { english: "change", vietnamese: "thay đổi", englishExample: "The weather changes quickly. / The season changes in November.", vietnameseExample: "Thời tiết thay đổi nhanh. / Mùa thay đổi vào tháng Mười Một." }
        ]
    },
    {
        title: "Chủ đề 7 – Animals",
        words: [
            { english: "animal", vietnamese: "động vật", englishExample: "I like animals. / Animals live everywhere.", vietnameseExample: "Tôi thích động vật. / Động vật sống khắp nơi." },
            { english: "pet", vietnamese: "thú cưng", englishExample: "I have a pet dog. / What pet do you have?", vietnameseExample: "Tôi có một chú chó cưng. / Bạn có thú cưng nào?" },
            { english: "dog", vietnamese: "chó", englishExample: "The dog is very friendly. / My dog can run fast.", vietnameseExample: "Con chó rất thân thiện. / Con chó của tôi chạy nhanh." },
            { english: "cat", vietnamese: "mèo", englishExample: "I love my cat. / The cat is sleeping on the chair.", vietnameseExample: "Tôi yêu con mèo của tôi. / Con mèo đang ngủ trên ghế." },
            { english: "bird", vietnamese: "chim", englishExample: "The bird can sing. / There are many birds in the tree.", vietnameseExample: "Con chim biết hót. / Có nhiều chim trên cây." },
            { english: "fish", vietnamese: "cá", englishExample: "Fish live in water. / I have two goldfish.", vietnameseExample: "Cá sống dưới nước. / Tôi có hai con cá vàng." },
            { english: "chicken", vietnamese: "gà", englishExample: "The chicken lays eggs. / We have chickens on our farm.", vietnameseExample: "Con gà đẻ trứng. / Chúng tôi có gà trong trang trại." },
            { english: "duck", vietnamese: "vịt", englishExample: "Ducks can swim. / The duck is in the pond.", vietnameseExample: "Vịt biết bơi. / Con vịt ở trong ao." },
            { english: "pig", vietnamese: "heo", englishExample: "The pig is fat and pink. / My uncle raises pigs.", vietnameseExample: "Con heo mập và hồng. / Chú tôi nuôi heo." },
            { english: "cow", vietnamese: "bò", englishExample: "The cow gives us milk. / There are five cows in the field.", vietnameseExample: "Con bò cho sữa. / Có năm con bò ngoài đồng." },
            { english: "buffalo", vietnamese: "trâu", englishExample: "The buffalo is strong. / Farmers use buffaloes to plough.", vietnameseExample: "Con trâu khỏe mạnh. / Nông dân dùng trâu để cày." },
            { english: "goat", vietnamese: "dê", englishExample: "The goat is eating grass. / I saw a goat on the hill.", vietnameseExample: "Con dê đang ăn cỏ. / Tôi thấy một con dê trên đồi." },
            { english: "horse", vietnamese: "ngựa", englishExample: "The horse runs very fast. / She rides a horse on weekends.", vietnameseExample: "Con ngựa chạy rất nhanh. / Cô ấy cưỡi ngựa cuối tuần." },
            { english: "elephant", vietnamese: "voi", englishExample: "The elephant is big. / Elephants have long trunks.", vietnameseExample: "Con voi to lớn. / Voi có vòi dài." },
            { english: "tiger", vietnamese: "hổ", englishExample: "The tiger lives in the jungle. / Tigers are dangerous animals.", vietnameseExample: "Hổ sống trong rừng. / Hổ là động vật nguy hiểm." },
            { english: "lion", vietnamese: "sư tử", englishExample: "The lion is the king of the jungle. / Lions eat meat.", vietnameseExample: "Sư tử là chúa sơn lâm. / Sư tử ăn thịt." },
            { english: "monkey", vietnamese: "khỉ", englishExample: "Monkeys can climb trees. / I saw a monkey at the zoo.", vietnameseExample: "Khỉ có thể leo cây. / Tôi thấy con khỉ ở sở thú." },
            { english: "bear", vietnamese: "gấu", englishExample: "The bear is sleeping. / Bears like honey.", vietnameseExample: "Con gấu đang ngủ. / Gấu thích mật ong." },
            { english: "rabbit", vietnamese: "thỏ", englishExample: "Rabbits have long ears. / My sister has a white rabbit.", vietnameseExample: "Thỏ có tai dài. / Em gái tôi có con thỏ trắng." },
            { english: "mouse", vietnamese: "chuột", englishExample: "The mouse is small. / A cat is chasing a mouse.", vietnameseExample: "Con chuột nhỏ. / Con mèo đang đuổi chuột." },
            { english: "snake", vietnamese: "rắn", englishExample: "Snakes are dangerous. / I’m afraid of snakes.", vietnameseExample: "Rắn rất nguy hiểm. / Tôi sợ rắn." },
            { english: "frog", vietnamese: "ếch", englishExample: "Frogs can jump. / There is a frog in the pond.", vietnameseExample: "Ếch biết nhảy. / Có một con ếch trong ao." },
            { english: "crocodile", vietnamese: "cá sấu", englishExample: "Crocodiles live in rivers. / A crocodile can swim fast.", vietnameseExample: "Cá sấu sống trong sông. / Cá sấu bơi nhanh." },
            { english: "giraffe", vietnamese: "hươu cao cổ", englishExample: "The giraffe has a long neck. / Giraffes eat leaves.", vietnameseExample: "Hươu cao cổ có cổ dài. / Hươu cao cổ ăn lá cây." },
            { english: "zebra", vietnamese: "ngựa vằn", englishExample: "Zebras have black and white stripes. / I saw a zebra at the zoo.", vietnameseExample: "Ngựa vằn có sọc đen trắng. / Tôi thấy ngựa vằn ở sở thú." },
            { english: "panda", vietnamese: "gấu trúc", englishExample: "Pandas live in China. / The panda is eating bamboo.", vietnameseExample: "Gấu trúc sống ở Trung Quốc. / Gấu trúc đang ăn tre." },
            { english: "kangaroo", vietnamese: "chuột túi", englishExample: "Kangaroos live in Australia. / A kangaroo can jump far.", vietnameseExample: "Chuột túi sống ở Úc. / Chuột túi có thể nhảy xa." },
            { english: "whale", vietnamese: "cá voi", englishExample: "Whales live in the sea. / The whale is the biggest animal.", vietnameseExample: "Cá voi sống ở biển. / Cá voi là loài lớn nhất." },
            { english: "dolphin", vietnamese: "cá heo", englishExample: "Dolphins are clever animals. / We saw dolphins at the aquarium.", vietnameseExample: "Cá heo là loài thông minh. / Chúng tôi thấy cá heo trong thủy cung." },
            { english: "shark", vietnamese: "cá mập", englishExample: "Sharks have sharp teeth. / A shark is swimming in the ocean.", vietnameseExample: "Cá mập có răng sắc. / Có cá mập đang bơi trong đại dương." },
            { english: "insect", vietnamese: "côn trùng", englishExample: "Bees are insects. / Insects have six legs.", vietnameseExample: "Ong là côn trùng. / Côn trùng có sáu chân." },
            { english: "bee", vietnamese: "ong", englishExample: "Bees make honey. / Don’t touch the bee!", vietnameseExample: "Ong làm mật. / Đừng chạm vào con ong!" },
            { english: "butterfly", vietnamese: "bướm", englishExample: "The butterfly is colorful. / Butterflies fly over the flowers.", vietnameseExample: "Con bướm nhiều màu. / Bướm bay trên hoa." },
            { english: "ant", vietnamese: "kiến", englishExample: "Ants are very small. / There are many ants on the ground.", vietnameseExample: "Kiến rất nhỏ. / Có nhiều kiến trên mặt đất." },
            { english: "spider", vietnamese: "nhện", englishExample: "The spider makes a web. / I’m scared of spiders.", vietnameseExample: "Nhện giăng tơ. / Tôi sợ nhện." },
            { english: "turtle", vietnamese: "rùa", englishExample: "The turtle walks slowly. / My brother has a pet turtle.", vietnameseExample: "Rùa đi chậm. / Em trai tôi nuôi rùa." },
            { english: "bird cage", vietnamese: "lồng chim", englishExample: "The bird is in the cage. / Clean the bird cage, please.", vietnameseExample: "Con chim ở trong lồng. / Làm ơn dọn lồng chim." },
            { english: "tail", vietnamese: "đuôi", englishExample: "The dog is wagging its tail. / The cat has a long tail.", vietnameseExample: "Con chó đang vẫy đuôi. / Con mèo có cái đuôi dài." },
            { english: "wing", vietnamese: "cánh", englishExample: "The bird spreads its wings. / Insects have wings.", vietnameseExample: "Con chim dang cánh. / Côn trùng có cánh." },
            { english: "feather", vietnamese: "lông (chim)", englishExample: "The bird has colorful feathers. / I found a feather on the ground.", vietnameseExample: "Con chim có lông nhiều màu. / Tôi nhặt được một chiếc lông trên đất." },
            { english: "fur", vietnamese: "lông (động vật có vú)", englishExample: "The rabbit has soft fur. / The cat’s fur is white.", vietnameseExample: "Con thỏ có bộ lông mềm. / Lông con mèo màu trắng." },
            { english: "claw", vietnamese: "móng vuốt", englishExample: "The cat has sharp claws. / Tigers use their claws to hunt.", vietnameseExample: "Mèo có móng vuốt sắc. / Hổ dùng móng vuốt để săn." },
            { english: "paw", vietnamese: "bàn chân (thú)", englishExample: "The dog hurt its paw. / Look at the cat’s paw prints.", vietnameseExample: "Con chó bị thương ở chân. / Nhìn dấu chân mèo kìa." },
            { english: "animal sound", vietnamese: "tiếng kêu động vật", englishExample: "The cat says “meow”. / What sound does a cow make?", vietnameseExample: "Mèo kêu “meo meo”. / Con bò kêu như thế nào?" },
            { english: "zoo", vietnamese: "sở thú", englishExample: "We go to the zoo on Sunday. / There are many wild animals in the zoo.", vietnameseExample: "Chúng tôi đi sở thú vào Chủ nhật. / Có nhiều thú hoang trong sở thú." },
            { english: "farm", vietnamese: "trang trại", englishExample: "My grandparents live on a farm. / There are cows and chickens on the farm.", vietnameseExample: "Ông bà tôi sống ở trang trại. / Có bò và gà ở trang trại." },
            { english: "jungle", vietnamese: "rừng rậm", englishExample: "Tigers live in the jungle. / The jungle is very large.", vietnameseExample: "Hổ sống trong rừng rậm. / Rừng rất rộng lớn." },
            { english: "forest", vietnamese: "khu rừng", englishExample: "There are many trees in the forest. / Bears live in the forest.", vietnameseExample: "Có nhiều cây trong rừng. / Gấu sống trong rừng." },
            { english: "ocean", vietnamese: "đại dương", englishExample: "Sharks live in the ocean. / The ocean is deep and blue.", vietnameseExample: "Cá mập sống trong đại dương. / Đại dương sâu và xanh." },
            { english: "animal trainer", vietnamese: "người huấn luyện động vật", englishExample: "The animal trainer feeds the lions. / He works as an animal trainer at the zoo.", vietnameseExample: "Người huấn luyện cho sư tử ăn. / Anh ấy làm huấn luyện viên thú ở sở thú." }
        ]
    },
    {
        title: "Chủ đề 8 – My House & Rooms",
        words: [
            { english: "house", vietnamese: "ngôi nhà", englishExample: "My house is big and nice. / We have a small house in the countryside.", vietnameseExample: "Ngôi nhà của tôi to và đẹp. / Chúng tôi có ngôi nhà nhỏ ở nông thôn." },
            { english: "home", vietnamese: "nhà, tổ ấm", englishExample: "I love my home. / She stays at home at the weekend.", vietnameseExample: "Tôi yêu ngôi nhà của mình. / Cô ấy ở nhà vào cuối tuần." },
            { english: "room", vietnamese: "phòng", englishExample: "There are five rooms in my house. / This room is very bright.", vietnameseExample: "Trong nhà tôi có năm phòng. / Phòng này rất sáng." },
            { english: "living room", vietnamese: "phòng khách", englishExample: "We watch TV in the living room. / The living room is next to the kitchen.", vietnameseExample: "Chúng tôi xem TV ở phòng khách. / Phòng khách ở cạnh bếp." },
            { english: "bedroom", vietnamese: "phòng ngủ", englishExample: "My bedroom is small but tidy. / There’s a bed in my bedroom.", vietnameseExample: "Phòng ngủ của tôi nhỏ nhưng gọn. / Có một chiếc giường trong phòng ngủ." },
            { english: "kitchen", vietnamese: "nhà bếp", englishExample: "My mother cooks in the kitchen. / The kitchen is clean and bright.", vietnameseExample: "Mẹ tôi nấu ăn trong bếp. / Nhà bếp sạch và sáng." },
            { english: "bathroom", vietnamese: "phòng tắm", englishExample: "The bathroom is next to my bedroom. / I take a shower in the bathroom.", vietnameseExample: "Phòng tắm ở cạnh phòng ngủ. / Tôi tắm trong phòng tắm." },
            { english: "dining room", vietnamese: "phòng ăn", englishExample: "We have dinner in the dining room. / The dining room has a big table.", vietnameseExample: "Chúng tôi ăn tối trong phòng ăn. / Phòng ăn có bàn lớn." },
            { english: "garden", vietnamese: "vườn", englishExample: "There are many flowers in the garden. / My father works in the garden.", vietnameseExample: "Có nhiều hoa trong vườn. / Bố tôi làm việc trong vườn." },
            { english: "yard", vietnamese: "sân", englishExample: "We play football in the yard. / The yard is in front of the house.", vietnameseExample: "Chúng tôi chơi bóng ở sân. / Sân ở phía trước nhà." },
            { english: "gate", vietnamese: "cổng", englishExample: "The gate is open. / Close the gate, please.", vietnameseExample: "Cổng đang mở. / Làm ơn đóng cổng lại." },
            { english: "roof", vietnamese: "mái nhà", englishExample: "The roof is red. / Birds are on the roof.", vietnameseExample: "Mái nhà màu đỏ. / Có chim trên mái nhà." },
            { english: "door", vietnamese: "cửa ra vào", englishExample: "Open the door, please. / The door is made of wood.", vietnameseExample: "Làm ơn mở cửa. / Cửa được làm bằng gỗ." },
            { english: "window", vietnamese: "cửa sổ", englishExample: "The window is open. / Close the window, it’s cold.", vietnameseExample: "Cửa sổ đang mở. / Đóng cửa sổ lại, trời lạnh đấy." },
            { english: "floor", vietnamese: "sàn nhà", englishExample: "The floor is clean. / We sit on the floor.", vietnameseExample: "Sàn nhà sạch sẽ. / Chúng tôi ngồi trên sàn." },
            { english: "wall", vietnamese: "tường", englishExample: "The walls are white. / There are pictures on the wall.", vietnameseExample: "Tường màu trắng. / Có tranh treo trên tường." },
            { english: "ceiling", vietnamese: "trần nhà", englishExample: "There’s a fan on the ceiling. / The ceiling light is bright.", vietnameseExample: "Có quạt trần trên trần nhà. / Đèn trần sáng rực." },
            { english: "lamp", vietnamese: "đèn", englishExample: "There’s a lamp on my desk. / Turn on the lamp, please.", vietnameseExample: "Có đèn bàn trên bàn học. / Làm ơn bật đèn lên." },
            { english: "light", vietnamese: "ánh sáng / đèn", englishExample: "The light is on. / Turn off the light before you go.", vietnameseExample: "Đèn đang bật. / Tắt đèn trước khi đi." },
            { english: "chair", vietnamese: "ghế", englishExample: "There are four chairs in the room. / I sit on the chair.", vietnameseExample: "Có bốn cái ghế trong phòng. / Tôi ngồi trên ghế." },
            { english: "table", vietnamese: "bàn", englishExample: "The books are on the table. / We eat at the dining table.", vietnameseExample: "Sách ở trên bàn. / Chúng tôi ăn ở bàn ăn." },
            { english: "bed", vietnamese: "giường", englishExample: "My bed is near the window. / I sleep on the bed.", vietnameseExample: "Giường của tôi ở gần cửa sổ. / Tôi ngủ trên giường." },
            { english: "desk", vietnamese: "bàn học", englishExample: "My desk is tidy. / There’s a computer on my desk.", vietnameseExample: "Bàn học của tôi gọn gàng. / Có máy tính trên bàn học." },
            { english: "bookshelf", vietnamese: "kệ sách", englishExample: "My books are on the bookshelf. / The bookshelf is full of English books.", vietnameseExample: "Sách của tôi trên kệ. / Kệ sách đầy sách tiếng Anh." },
            { english: "cupboard", vietnamese: "tủ chén", englishExample: "The plates are in the cupboard. / Open the cupboard and take a glass.", vietnameseExample: "Đĩa ở trong tủ chén. / Mở tủ lấy cái ly đi." },
            { english: "wardrobe", vietnamese: "tủ quần áo", englishExample: "My clothes are in the wardrobe. / She has a big wardrobe in her room.", vietnameseExample: "Quần áo tôi ở trong tủ. / Cô ấy có tủ quần áo to." },
            { english: "fridge", vietnamese: "tủ lạnh", englishExample: "There’s some milk in the fridge. / Don’t forget to close the fridge door.", vietnameseExample: "Có sữa trong tủ lạnh. / Đừng quên đóng cửa tủ lạnh." },
            { english: "stove", vietnamese: "bếp nấu", englishExample: "My mom cooks on the stove. / Turn off the stove after cooking.", vietnameseExample: "Mẹ tôi nấu ăn trên bếp. / Tắt bếp sau khi nấu xong." },
            { english: "sink", vietnamese: "bồn rửa", englishExample: "I wash the dishes in the sink. / The sink is full of plates.", vietnameseExample: "Tôi rửa chén trong bồn. / Bồn đầy đĩa." },
            { english: "mirror", vietnamese: "gương", englishExample: "There’s a mirror on the wall. / I look at myself in the mirror.", vietnameseExample: "Có cái gương treo trên tường. / Tôi soi mình trong gương." },
            { english: "picture", vietnamese: "bức tranh", englishExample: "There’s a picture above the sofa. / I like that picture of flowers.", vietnameseExample: "Có bức tranh phía trên ghế sofa. / Tôi thích bức tranh hoa đó." },
            { english: "sofa", vietnamese: "ghế sofa", englishExample: "I sit on the sofa to watch TV. / The sofa is very comfortable.", vietnameseExample: "Tôi ngồi trên ghế sofa xem TV. / Ghế sofa rất thoải mái." },
            { english: "carpet", vietnamese: "thảm", englishExample: "There’s a carpet on the floor. / The carpet is soft and clean.", vietnameseExample: "Có tấm thảm trên sàn. / Thảm mềm và sạch." },
            { english: "television / TV", vietnamese: "tivi", englishExample: "We watch TV every evening. / The TV is in the living room.", vietnameseExample: "Chúng tôi xem TV mỗi tối. / TV ở phòng khách." },
            { english: "clock", vietnamese: "đồng hồ", englishExample: "There’s a clock on the wall. / The clock shows seven o’clock.", vietnameseExample: "Có đồng hồ trên tường. / Đồng hồ chỉ 7 giờ." },
            { english: "fan", vietnamese: "quạt", englishExample: "The fan is on the ceiling. / Turn off the fan, please.", vietnameseExample: "Quạt ở trên trần. / Làm ơn tắt quạt." },
            { english: "air conditioner", vietnamese: "máy lạnh", englishExample: "The air conditioner is very cool. / Please turn on the air conditioner.", vietnameseExample: "Máy lạnh rất mát. / Làm ơn bật máy lạnh lên." },
            { english: "doorbell", vietnamese: "chuông cửa", englishExample: "The doorbell is ringing. / Someone is at the door, I hear the doorbell.", vietnameseExample: "Chuông cửa đang reo. / Có ai đó ở cửa, tôi nghe tiếng chuông." },
            { english: "upstairs", vietnamese: "tầng trên", englishExample: "My bedroom is upstairs. / She is running upstairs.", vietnameseExample: "Phòng ngủ tôi ở tầng trên. / Cô ấy đang chạy lên tầng." },
            { english: "downstairs", vietnamese: "tầng dưới", englishExample: "The kitchen is downstairs. / Let’s go downstairs for lunch.", vietnameseExample: "Nhà bếp ở tầng dưới. / Hãy xuống dưới ăn trưa." },
            { english: "balcony", vietnamese: "ban công", englishExample: "We have breakfast on the balcony. / The balcony has many flowers.", vietnameseExample: "Chúng tôi ăn sáng ở ban công. / Ban công có nhiều hoa." },
            { english: "garage", vietnamese: "nhà để xe", englishExample: "My father parks the car in the garage. / The garage is next to the gate.", vietnameseExample: "Bố tôi để xe trong gara. / Gara ở cạnh cổng." },
            { english: "tidy", vietnamese: "gọn gàng", englishExample: "Keep your room tidy. / My mother is cleaning the tidy room.", vietnameseExample: "Giữ phòng gọn gàng nhé. / Mẹ tôi đang lau căn phòng gọn gàng." },
            { english: "messy", vietnamese: "bừa bộn", englishExample: "Your room is so messy! / Don’t leave your room messy.", vietnameseExample: "Phòng bạn bừa bộn quá! / Đừng để phòng bừa bộn." },
            { english: "clean", vietnamese: "sạch", englishExample: "The kitchen is clean. / We clean the house every Sunday.", vietnameseExample: "Nhà bếp sạch sẽ. / Chúng tôi dọn nhà mỗi Chủ nhật." },
            { english: "dirty", vietnamese: "bẩn", englishExample: "The floor is dirty. / Don’t wear dirty shoes inside.", vietnameseExample: "Sàn nhà bẩn. / Đừng mang giày bẩn vào nhà." },
            { english: "comfortable", vietnamese: "thoải mái", englishExample: "The sofa is comfortable. / I feel comfortable in my room.", vietnameseExample: "Ghế sofa thật thoải mái. / Tôi cảm thấy dễ chịu trong phòng." },
            { english: "move", vietnamese: "di chuyển", englishExample: "We moved to a new house. / Don’t move the chair.", vietnameseExample: "Chúng tôi đã chuyển đến nhà mới. / Đừng di chuyển cái ghế." },
            { english: "build", vietnamese: "xây dựng", englishExample: "They are building a new house. / My father can build a wall.", vietnameseExample: "Họ đang xây nhà mới. / Bố tôi có thể xây tường." }
        ]
    },
    {
        title: "Chủ đề 9 – Places in Town",
        words: [
            { english: "town", vietnamese: "thị trấn", englishExample: "My town is small but clean. / We live in a quiet town.", vietnameseExample: "Thị trấn của tôi nhỏ nhưng sạch. / Chúng tôi sống ở một thị trấn yên tĩnh." },
            { english: "city", vietnamese: "thành phố", englishExample: "Hanoi is a big city. / The city is very crowded.", vietnameseExample: "Hà Nội là một thành phố lớn. / Thành phố rất đông đúc." },
            { english: "village", vietnamese: "làng", englishExample: "My grandparents live in a village. / The village is peaceful.", vietnameseExample: "Ông bà tôi sống ở một ngôi làng. / Ngôi làng yên bình." },
            { english: "street", vietnamese: "con đường", englishExample: "Our school is on Nguyen Trai Street. / The street is full of cars.", vietnameseExample: "Trường tôi ở đường Nguyễn Trãi. / Con đường đầy xe cộ." },
            { english: "road", vietnamese: "đường", englishExample: "Don’t play on the road. / This road leads to the city center.", vietnameseExample: "Đừng chơi ngoài đường. / Con đường này dẫn đến trung tâm." },
            { english: "bridge", vietnamese: "cây cầu", englishExample: "There’s a bridge over the river. / We walk across the bridge every day.", vietnameseExample: "Có cây cầu bắc qua sông. / Chúng tôi đi qua cầu mỗi ngày." },
            { english: "park", vietnamese: "công viên", englishExample: "We play football in the park. / The park is near my house.", vietnameseExample: "Chúng tôi chơi bóng ở công viên. / Công viên gần nhà tôi." },
            { english: "square", vietnamese: "quảng trường", englishExample: "The festival is in the town square. / There’s a big tree in the square.", vietnameseExample: "Lễ hội diễn ra ở quảng trường. / Có cây to giữa quảng trường." },
            { english: "school", vietnamese: "trường học", englishExample: "Our school is beautiful. / The school is opposite the park.", vietnameseExample: "Trường chúng tôi đẹp. / Trường nằm đối diện công viên." },
            { english: "hospital", vietnamese: "bệnh viện", englishExample: "My mother works in a hospital. / The hospital is next to the bank.", vietnameseExample: "Mẹ tôi làm việc ở bệnh viện. / Bệnh viện cạnh ngân hàng." },
            { english: "clinic", vietnamese: "phòng khám", englishExample: "There’s a clinic near the post office. / I go to the clinic when I’m sick.", vietnameseExample: "Có phòng khám gần bưu điện. / Tôi đến phòng khám khi bị ốm." },
            { english: "pharmacy / drugstore", vietnamese: "nhà thuốc", englishExample: "You can buy medicine at the pharmacy. / The drugstore opens at 8 a.m.", vietnameseExample: "Bạn có thể mua thuốc ở nhà thuốc. / Nhà thuốc mở lúc 8 giờ sáng." },
            { english: "post office", vietnamese: "bưu điện", englishExample: "My father works at the post office. / I send a letter at the post office.", vietnameseExample: "Bố tôi làm ở bưu điện. / Tôi gửi thư ở bưu điện." },
            { english: "police station", vietnamese: "đồn cảnh sát", englishExample: "The police station is near the bank. / A policeman works at the police station.", vietnameseExample: "Đồn cảnh sát ở gần ngân hàng. / Cảnh sát làm việc ở đó." },
            { english: "fire station", vietnamese: "trạm cứu hỏa", englishExample: "The fire station is on this street. / Firefighters work at the fire station.", vietnameseExample: "Trạm cứu hỏa ở con đường này. / Lính cứu hỏa làm việc tại đó." },
            { english: "library", vietnamese: "thư viện", englishExample: "I read books in the library. / The library has many English books.", vietnameseExample: "Tôi đọc sách ở thư viện. / Thư viện có nhiều sách tiếng Anh." },
            { english: "museum", vietnamese: "bảo tàng", englishExample: "We visit the history museum. / The museum is full of old things.", vietnameseExample: "Chúng tôi tham quan bảo tàng lịch sử. / Bảo tàng có nhiều đồ cổ." },
            { english: "cinema / movie theater", vietnamese: "rạp chiếu phim", englishExample: "Let’s go to the cinema tonight. / We watch a movie at the theater.", vietnameseExample: "Tối nay đi xem phim nhé. / Chúng tôi xem phim ở rạp." },
            { english: "theater", vietnamese: "nhà hát", englishExample: "The play is on at the theater. / My aunt works in the theater.", vietnameseExample: "Vở kịch đang diễn ở nhà hát. / Dì tôi làm việc ở đó." },
            { english: "stadium", vietnamese: "sân vận động", englishExample: "We play football at the stadium. / The stadium is full of people.", vietnameseExample: "Chúng tôi đá bóng ở sân vận động. / Sân vận động đông kín người." },
            { english: "sports center", vietnamese: "trung tâm thể thao", englishExample: "I swim at the sports center. / There’s a new sports center near the park.", vietnameseExample: "Tôi bơi ở trung tâm thể thao. / Có trung tâm thể thao mới gần công viên." },
            { english: "swimming pool", vietnamese: "hồ bơi", englishExample: "The swimming pool is very clean. / We go swimming every Sunday.", vietnameseExample: "Hồ bơi rất sạch. / Chúng tôi đi bơi mỗi Chủ nhật." },
            { english: "gym", vietnamese: "phòng tập thể dục", englishExample: "My brother goes to the gym every morning. / The gym is behind the cinema.", vietnameseExample: "Anh tôi đi tập thể dục mỗi sáng. / Phòng tập ở phía sau rạp chiếu phim." },
            { english: "market", vietnamese: "chợ", englishExample: "My mom buys vegetables at the market. / The market is very busy in the morning.", vietnameseExample: "Mẹ tôi mua rau ở chợ. / Buổi sáng chợ rất đông." },
            { english: "supermarket", vietnamese: "siêu thị", englishExample: "We go shopping at the supermarket. / The supermarket sells everything.", vietnameseExample: "Chúng tôi đi mua sắm ở siêu thị. / Siêu thị bán đủ thứ." },
            { english: "grocery store", vietnamese: "cửa hàng tạp hóa", englishExample: "There’s a grocery store near my house. / I buy bread at the grocery store.", vietnameseExample: "Có cửa hàng tạp hóa gần nhà tôi. / Tôi mua bánh mì ở đó." },
            { english: "bakery", vietnamese: "tiệm bánh", englishExample: "I buy bread at the bakery. / The bakery smells so good.", vietnameseExample: "Tôi mua bánh ở tiệm bánh. / Tiệm bánh thơm phức." },
            { english: "restaurant", vietnamese: "nhà hàng", englishExample: "Let’s eat at that restaurant. / The restaurant serves good food.", vietnameseExample: "Hãy ăn ở nhà hàng kia đi. / Nhà hàng đó phục vụ món ngon." },
            { english: "café", vietnamese: "quán cà phê", englishExample: "We sit in a café after school. / My father drinks coffee at the café.", vietnameseExample: "Chúng tôi ngồi ở quán cà phê sau giờ học. / Bố tôi uống cà phê ở quán." },
            { english: "hotel", vietnamese: "khách sạn", englishExample: "The hotel is near the beach. / We stay at a big hotel.", vietnameseExample: "Khách sạn ở gần bãi biển. / Chúng tôi ở một khách sạn lớn." },
            { english: "bank", vietnamese: "ngân hàng", englishExample: "My mom works in a bank. / I put my money in the bank.", vietnameseExample: "Mẹ tôi làm việc ở ngân hàng. / Tôi gửi tiền trong ngân hàng." },
            { english: "office", vietnamese: "văn phòng", englishExample: "My father works in an office. / The office is on the second floor.", vietnameseExample: "Bố tôi làm việc ở văn phòng. / Văn phòng ở tầng hai." },
            { english: "factory", vietnamese: "nhà máy", englishExample: "My uncle works in a factory. / The factory makes clothes.", vietnameseExample: "Chú tôi làm việc trong nhà máy. / Nhà máy sản xuất quần áo." },
            { english: "station", vietnamese: "nhà ga / trạm", englishExample: "The train station is near the river. / We go to the bus station every day.", vietnameseExample: "Nhà ga ở gần sông. / Chúng tôi đến bến xe mỗi ngày." },
            { english: "bus stop", vietnamese: "trạm xe buýt", englishExample: "The bus stop is opposite the park. / Wait for me at the bus stop.", vietnameseExample: "Trạm xe buýt đối diện công viên. / Chờ tôi ở trạm xe buýt nhé." },
            { english: "airport", vietnamese: "sân bay", englishExample: "The airport is far from the city. / We go to the airport by taxi.", vietnameseExample: "Sân bay cách xa thành phố. / Chúng tôi đi taxi đến sân bay." },
            { english: "church", vietnamese: "nhà thờ", englishExample: "The church is very old. / My family goes to church on Sundays.", vietnameseExample: "Nhà thờ rất cổ. / Gia đình tôi đi lễ vào Chủ nhật." },
            { english: "pagoda", vietnamese: "chùa", englishExample: "There’s a big pagoda on the hill. / People visit the pagoda at Tet.", vietnameseExample: "Có ngôi chùa lớn trên đồi. / Mọi người đi chùa vào dịp Tết." },
            { english: "temple", vietnamese: "đền, miếu", englishExample: "The temple is near the lake. / They visit the temple every year.", vietnameseExample: "Ngôi đền ở gần hồ. / Họ viếng đền mỗi năm." },
            { english: "police officer", vietnamese: "cảnh sát", englishExample: "The police officer helps people. / A police officer works in the police station.", vietnameseExample: "Cảnh sát giúp đỡ mọi người. / Cảnh sát làm việc ở đồn." },
            { english: "firefighter", vietnamese: "lính cứu hỏa", englishExample: "Firefighters put out fires. / A firefighter drives the fire truck.", vietnameseExample: "Lính cứu hỏa dập lửa. / Lính cứu hỏa lái xe chữa cháy." },
            { english: "neighbor", vietnamese: "hàng xóm", englishExample: "My neighbors are friendly. / We have good neighbors.", vietnameseExample: "Hàng xóm của tôi thân thiện. / Chúng tôi có những người hàng xóm tốt." },
            { english: "near", vietnamese: "gần", englishExample: "The school is near the post office. / My house is near the park.", vietnameseExample: "Trường ở gần bưu điện. / Nhà tôi gần công viên." },
            { english: "opposite", vietnamese: "đối diện", englishExample: "The bank is opposite the cinema. / My house is opposite the school.", vietnameseExample: "Ngân hàng đối diện rạp chiếu phim. / Nhà tôi đối diện trường." },
            { english: "next to", vietnamese: "bên cạnh", englishExample: "The hospital is next to the park. / The post office is next to the bank.", vietnameseExample: "Bệnh viện bên cạnh công viên. / Bưu điện ở cạnh ngân hàng." },
            { english: "between", vietnamese: "giữa", englishExample: "The school is between the bank and the post office. / The park is between two buildings.", vietnameseExample: "Trường nằm giữa ngân hàng và bưu điện. / Công viên nằm giữa hai tòa nhà." },
            { english: "behind", vietnamese: "phía sau", englishExample: "The supermarket is behind the cinema. / There’s a car behind the house.", vietnameseExample: "Siêu thị ở phía sau rạp chiếu phim. / Có chiếc xe sau nhà." },
            { english: "in front of", vietnamese: "phía trước", englishExample: "There’s a tree in front of my house. / The bus stop is in front of the park.", vietnameseExample: "Có cây trước nhà tôi. / Trạm xe buýt ở trước công viên." },
            { english: "across from", vietnamese: "đối diện / bên kia đường", englishExample: "The school is across from the library. / The café is across from the bank.", vietnameseExample: "Trường đối diện thư viện. / Quán cà phê bên kia ngân hàng." },
            { english: "go straight", vietnamese: "đi thẳng", englishExample: "Go straight and turn left. / Go straight to the traffic lights.", vietnameseExample: "Đi thẳng rồi rẽ trái. / Đi thẳng tới đèn giao thông." },
            { english: "turn left", vietnamese: "rẽ trái", englishExample: "Turn left at the corner. / Turn left into Green Street.", vietnameseExample: "Rẽ trái ở góc đường. / Rẽ trái vào đường Green." },
            { english: "turn right", vietnamese: "rẽ phải", englishExample: "Turn right at the traffic lights. / Don’t turn right here.", vietnameseExample: "Rẽ phải ở đèn giao thông. / Đừng rẽ phải ở đây." },
            { english: "crossroads", vietnamese: "ngã tư", englishExample: "There’s a crossroads near the park. / Turn right at the crossroads.", vietnameseExample: "Có ngã tư gần công viên. / Rẽ phải ở ngã tư." },
            { english: "traffic lights", vietnamese: "đèn giao thông", englishExample: "Stop at the traffic lights. / The traffic lights are red.", vietnameseExample: "Dừng lại ở đèn giao thông. / Đèn đang đỏ." }
        ]
    },
    {
        title: "Chủ đề 10 – Transportation",
        words: [
            { english: "transport / transportation", vietnamese: "phương tiện giao thông", englishExample: "Transportation is very important. / Public transport saves energy.", vietnameseExample: "Giao thông rất quan trọng. / Giao thông công cộng tiết kiệm năng lượng." },
            { english: "vehicle", vietnamese: "xe cộ", englishExample: "There are many vehicles on the road. / Cars and bikes are vehicles.", vietnameseExample: "Có nhiều xe cộ trên đường. / Ô tô và xe đạp là phương tiện." },
            { english: "car", vietnamese: "ô tô", englishExample: "My father drives a car to work. / The car is very fast.", vietnameseExample: "Bố tôi lái ô tô đi làm. / Chiếc xe rất nhanh." },
            { english: "bus", vietnamese: "xe buýt", englishExample: "I go to school by bus. / The bus stop is near my house.", vietnameseExample: "Tôi đi học bằng xe buýt. / Trạm xe buýt gần nhà tôi." },
            { english: "bike / bicycle", vietnamese: "xe đạp", englishExample: "I ride my bike to school. / She has a new bicycle.", vietnameseExample: "Tôi đi học bằng xe đạp. / Cô ấy có xe đạp mới." },
            { english: "motorbike / motorcycle", vietnamese: "xe máy", englishExample: "He goes to work by motorbike. / My mother has a red motorcycle.", vietnameseExample: "Anh ấy đi làm bằng xe máy. / Mẹ tôi có xe máy màu đỏ." },
            { english: "scooter", vietnamese: "xe tay ga", englishExample: "I ride a scooter in the park. / Scooters are easy to ride.", vietnameseExample: "Tôi chạy xe tay ga trong công viên. / Xe tay ga dễ chạy." },
            { english: "taxi", vietnamese: "xe taxi", englishExample: "We take a taxi to the airport. / The taxi driver is friendly.", vietnameseExample: "Chúng tôi đi taxi đến sân bay. / Tài xế taxi rất thân thiện." },
            { english: "train", vietnamese: "tàu hỏa", englishExample: "The train is arriving at the station. / We go to Hanoi by train.", vietnameseExample: "Tàu đang đến ga. / Chúng tôi đi Hà Nội bằng tàu." },
            { english: "subway / underground", vietnamese: "tàu điện ngầm", englishExample: "There’s a subway in big cities. / We travel by subway in Tokyo.", vietnameseExample: "Ở thành phố lớn có tàu điện ngầm. / Chúng tôi đi tàu điện ngầm ở Tokyo." },
            { english: "tram", vietnamese: "tàu điện", englishExample: "The tram runs through the city. / I like to travel by tram.", vietnameseExample: "Tàu điện chạy quanh thành phố. / Tôi thích đi bằng tàu điện." },
            { english: "plane / airplane", vietnamese: "máy bay", englishExample: "We travel by plane to Ho Chi Minh City. / The airplane takes off at 9 a.m.", vietnameseExample: "Chúng tôi đi TP.HCM bằng máy bay. / Máy bay cất cánh lúc 9 giờ." },
            { english: "helicopter", vietnamese: "trực thăng", englishExample: "The helicopter is flying over the sea. / A helicopter can land anywhere.", vietnameseExample: "Trực thăng đang bay trên biển. / Trực thăng có thể hạ cánh ở bất cứ đâu." },
            { english: "ship", vietnamese: "tàu thủy", englishExample: "The ship is very large. / We travel across the sea by ship.", vietnameseExample: "Con tàu rất lớn. / Chúng tôi đi biển bằng tàu." },
            { english: "boat", vietnamese: "thuyền", englishExample: "The fisherman has a small boat. / We go fishing by boat.", vietnameseExample: "Người đánh cá có chiếc thuyền nhỏ. / Chúng tôi đi câu bằng thuyền." },
            { english: "ferry", vietnamese: "phà", englishExample: "We cross the river by ferry. / The ferry carries many people.", vietnameseExample: "Chúng tôi qua sông bằng phà. / Chiếc phà chở nhiều người." },
            { english: "truck / lorry", vietnamese: "xe tải", englishExample: "The truck carries fruit to the market. / A big lorry is on the road.", vietnameseExample: "Xe tải chở trái cây ra chợ. / Có chiếc xe tải lớn trên đường." },
            { english: "van", vietnamese: "xe tải nhỏ", englishExample: "The van is delivering goods. / My uncle drives a white van.", vietnameseExample: "Xe tải nhỏ đang giao hàng. / Chú tôi lái xe tải nhỏ màu trắng." },
            { english: "station", vietnamese: "nhà ga", englishExample: "The train station is far from here. / We meet at the bus station.", vietnameseExample: "Nhà ga cách đây xa. / Chúng tôi gặp nhau ở bến xe." },
            { english: "airport", vietnamese: "sân bay", englishExample: "The airport is very busy today. / We wait for our flight at the airport.", vietnameseExample: "Sân bay hôm nay rất đông. / Chúng tôi chờ chuyến bay ở sân bay." },
            { english: "driver", vietnamese: "người lái xe", englishExample: "The driver is careful. / My father is a taxi driver.", vietnameseExample: "Tài xế rất cẩn thận. / Bố tôi là tài xế taxi." },
            { english: "passenger", vietnamese: "hành khách", englishExample: "There are ten passengers on the bus. / Passengers must wear seat belts.", vietnameseExample: "Có 10 hành khách trên xe buýt. / Hành khách phải thắt dây an toàn." },
            { english: "traffic", vietnamese: "giao thông", englishExample: "The traffic is very bad today. / There’s heavy traffic in the morning.", vietnameseExample: "Giao thông hôm nay tệ. / Buổi sáng có nhiều xe cộ." },
            { english: "traffic jam", vietnamese: "kẹt xe", englishExample: "We were late because of a traffic jam. / There’s a big traffic jam on this road.", vietnameseExample: "Chúng tôi đến trễ vì kẹt xe. / Có kẹt xe lớn trên đường này." },
            { english: "traffic light", vietnamese: "đèn giao thông", englishExample: "Stop at the red traffic light. / The traffic light turns green.", vietnameseExample: "Dừng lại khi đèn đỏ. / Đèn giao thông chuyển sang xanh." },
            { english: "road", vietnamese: "con đường", englishExample: "The road is very busy. / Don’t play on the road.", vietnameseExample: "Đường rất đông xe. / Đừng chơi ngoài đường." },
            { english: "bridge", vietnamese: "cây cầu", englishExample: "There’s a new bridge across the river. / Cars go over the bridge.", vietnameseExample: "Có cây cầu mới bắc qua sông. / Xe chạy qua cầu." },
            { english: "crosswalk", vietnamese: "vạch qua đường", englishExample: "Use the crosswalk, please. / Children cross the road at the crosswalk.", vietnameseExample: "Làm ơn đi qua đường ở vạch trắng. / Trẻ em qua đường ở vạch dành riêng." },
            { english: "seat belt", vietnamese: "dây an toàn", englishExample: "Fasten your seat belt, please. / All passengers must wear seat belts.", vietnameseExample: "Làm ơn thắt dây an toàn. / Tất cả hành khách phải thắt dây an toàn." },
            { english: "helmet", vietnamese: "mũ bảo hiểm", englishExample: "Wear a helmet when you ride a motorbike. / My helmet is blue.", vietnameseExample: "Đội mũ bảo hiểm khi đi xe máy. / Mũ bảo hiểm của tôi màu xanh." },
            { english: "gas / petrol", vietnamese: "xăng", englishExample: "We need to buy some petrol. / The car runs out of gas.", vietnameseExample: "Chúng ta cần mua xăng. / Xe hết xăng rồi." },
            { english: "wheel", vietnamese: "bánh xe", englishExample: "The bike has two wheels. / The car has four wheels.", vietnameseExample: "Xe đạp có hai bánh. / Ô tô có bốn bánh." },
            { english: "engine", vietnamese: "động cơ", englishExample: "The engine is very noisy. / A car can’t move without an engine.", vietnameseExample: "Động cơ rất ồn. / Xe không thể chạy nếu không có động cơ." },
            { english: "ticket", vietnamese: "vé", englishExample: "I buy a ticket for the bus. / The train ticket is cheap.", vietnameseExample: "Tôi mua vé xe buýt. / Vé tàu rẻ." },
            { english: "fare", vietnamese: "tiền vé", englishExample: "The bus fare is 10,000 dong. / You must pay the fare before you ride.", vietnameseExample: "Vé xe buýt giá 10.000 đồng. / Bạn phải trả tiền vé trước khi đi." },
            { english: "station worker", vietnamese: "nhân viên nhà ga", englishExample: "The station worker helps passengers. / I ask the station worker for help.", vietnameseExample: "Nhân viên nhà ga giúp đỡ hành khách. / Tôi nhờ nhân viên nhà ga hỗ trợ." },
            { english: "stop", vietnamese: "dừng lại", englishExample: "The bus stops in front of my house. / Don’t stop in the middle of the road.", vietnameseExample: "Xe buýt dừng trước nhà tôi. / Đừng dừng giữa đường." },
            { english: "go / travel", vietnamese: "đi, di chuyển", englishExample: "We go to school by bike. / They travel to Da Nang by train.", vietnameseExample: "Chúng tôi đi học bằng xe đạp. / Họ đi Đà Nẵng bằng tàu." },
            { english: "ride", vietnamese: "cưỡi / lái (xe hai bánh)", englishExample: "I ride my bike to school. / He rides a motorbike to work.", vietnameseExample: "Tôi đạp xe đến trường. / Anh ấy đi làm bằng xe máy." },
            { english: "drive", vietnamese: "lái (xe bốn bánh)", englishExample: "My dad drives to work every day. / Can you drive a car?", vietnameseExample: "Bố tôi lái xe đi làm hằng ngày. / Bạn biết lái xe không?" },
            { english: "fly", vietnamese: "bay", englishExample: "Birds can fly. / We fly to Hue by plane.", vietnameseExample: "Chim có thể bay. / Chúng tôi bay đến Huế bằng máy bay." },
            { english: "sail", vietnamese: "đi thuyền / chèo thuyền", englishExample: "They sail across the lake. / My uncle can sail a boat.", vietnameseExample: "Họ chèo thuyền qua hồ. / Chú tôi biết lái thuyền buồm." },
            { english: "walk", vietnamese: "đi bộ", englishExample: "I walk to school every morning. / Let’s walk to the park.", vietnameseExample: "Tôi đi bộ đến trường mỗi sáng. / Hãy đi bộ đến công viên." },
            { english: "traffic sign", vietnamese: "biển báo giao thông", englishExample: "Follow the traffic signs. / That traffic sign means “Stop”.", vietnameseExample: "Hãy tuân thủ biển báo giao thông. / Biển báo đó có nghĩa là “Dừng lại”." },
            { english: "accident", vietnamese: "tai nạn", englishExample: "Be careful to avoid accidents. / There was a traffic accident yesterday.", vietnameseExample: "Hãy cẩn thận để tránh tai nạn. / Hôm qua có tai nạn giao thông." },
            { english: "safe", vietnamese: "an toàn", englishExample: "Always be safe on the road. / Wear your helmet to stay safe.", vietnameseExample: "Luôn an toàn khi tham gia giao thông. / Đội mũ để được an toàn." },
            { english: "dangerous", vietnamese: "nguy hiểm", englishExample: "Crossing the road is dangerous. / It’s dangerous to drive fast.", vietnameseExample: "Băng qua đường rất nguy hiểm. / Lái xe nhanh là nguy hiểm." }
        ]
    },
    {
        title: "Chủ đề 11 – Sports & Hobbies",
        words: [
            { english: "sport", vietnamese: "thể thao", englishExample: "I like sports. / Playing sports is good for health.", vietnameseExample: "Tôi thích thể thao. / Chơi thể thao tốt cho sức khỏe." },
            { english: "exercise", vietnamese: "bài tập thể dục", englishExample: "I do morning exercise every day. / Exercise keeps you healthy.", vietnameseExample: "Tôi tập thể dục buổi sáng mỗi ngày. / Tập thể dục giúp bạn khỏe mạnh." },
            { english: "play", vietnamese: "chơi", englishExample: "I play football after school. / She plays badminton with her friends.", vietnameseExample: "Tôi chơi bóng đá sau giờ học. / Cô ấy chơi cầu lông với bạn." },
            { english: "go", vietnamese: "đi (với hoạt động)", englishExample: "I go swimming on weekends. / We go cycling in the park.", vietnameseExample: "Tôi đi bơi vào cuối tuần. / Chúng tôi đi đạp xe trong công viên." },
            { english: "do", vietnamese: "tập (với hoạt động)", englishExample: "I do karate every Friday. / My sister does yoga in the morning.", vietnameseExample: "Tôi tập võ karate vào thứ Sáu. / Chị tôi tập yoga vào buổi sáng." },
            { english: "football / soccer", vietnamese: "bóng đá", englishExample: "We play football in the yard. / My favorite sport is football.", vietnameseExample: "Chúng tôi chơi bóng ở sân. / Môn thể thao tôi thích là bóng đá." },
            { english: "badminton", vietnamese: "cầu lông", englishExample: "She plays badminton very well. / We play badminton every afternoon.", vietnameseExample: "Cô ấy chơi cầu lông rất giỏi. / Chúng tôi chơi cầu lông mỗi chiều." },
            { english: "volleyball", vietnamese: "bóng chuyền", englishExample: "They play volleyball at school. / Volleyball is a popular sport.", vietnameseExample: "Họ chơi bóng chuyền ở trường. / Bóng chuyền là môn phổ biến." },
            { english: "basketball", vietnamese: "bóng rổ", englishExample: "He plays basketball with his friends. / Basketball players are tall.", vietnameseExample: "Cậu ấy chơi bóng rổ với bạn. / Cầu thủ bóng rổ thường cao." },
            { english: "tennis", vietnamese: "quần vợt", englishExample: "I play tennis on weekends. / My father likes watching tennis.", vietnameseExample: "Tôi chơi tennis cuối tuần. / Bố tôi thích xem tennis." },
            { english: "table tennis / ping-pong", vietnamese: "bóng bàn", englishExample: "We play table tennis at the club. / Table tennis is my favorite sport.", vietnameseExample: "Chúng tôi chơi bóng bàn ở câu lạc bộ. / Bóng bàn là môn tôi thích." },
            { english: "swimming", vietnamese: "bơi lội", englishExample: "I go swimming in the summer. / Swimming is a good exercise.", vietnameseExample: "Tôi đi bơi vào mùa hè. / Bơi lội là bài tập tốt." },
            { english: "cycling", vietnamese: "đạp xe", englishExample: "They go cycling every morning. / Cycling is fun and healthy.", vietnameseExample: "Họ đạp xe mỗi sáng. / Đạp xe vui và tốt cho sức khỏe." },
            { english: "jogging", vietnamese: "chạy bộ chậm", englishExample: "My father goes jogging in the park. / Jogging helps me stay fit.", vietnameseExample: "Bố tôi chạy bộ trong công viên. / Chạy bộ giúp tôi giữ dáng." },
            { english: "running", vietnamese: "chạy nhanh", englishExample: "She likes running with her dog. / Running makes me tired.", vietnameseExample: "Cô ấy thích chạy cùng chó. / Chạy khiến tôi mệt." },
            { english: "yoga", vietnamese: "yoga", englishExample: "My mom does yoga every morning. / Yoga makes me relaxed.", vietnameseExample: "Mẹ tôi tập yoga mỗi sáng. / Yoga giúp tôi thư giãn." },
            { english: "karate", vietnamese: "võ karate", englishExample: "I do karate after school. / Karate is a Japanese sport.", vietnameseExample: "Tôi tập karate sau giờ học. / Karate là môn võ Nhật Bản." },
            { english: "aerobics", vietnamese: "thể dục nhịp điệu", englishExample: "My aunt does aerobics at the gym. / Aerobics is good for women.", vietnameseExample: "Dì tôi tập thể dục nhịp điệu ở phòng tập. / Thể dục nhịp điệu tốt cho phụ nữ." },
            { english: "table game", vietnamese: "trò chơi bàn", englishExample: "We play table games at home. / Chess is a table game.", vietnameseExample: "Chúng tôi chơi trò bàn ở nhà. / Cờ vua là trò chơi bàn." },
            { english: "chess", vietnamese: "cờ vua", englishExample: "He is good at chess. / We play chess after dinner.", vietnameseExample: "Cậu ấy giỏi chơi cờ vua. / Chúng tôi chơi cờ sau bữa tối." },
            { english: "computer games", vietnamese: "trò chơi điện tử", englishExample: "I like playing computer games. / Don’t play computer games too long.", vietnameseExample: "Tôi thích chơi game điện tử. / Đừng chơi game quá lâu." },
            { english: "hobby", vietnamese: "sở thích", englishExample: "My hobby is reading books. / Hobbies make life more fun.", vietnameseExample: "Sở thích của tôi là đọc sách. / Sở thích làm cuộc sống vui hơn." },
            { english: "collect", vietnamese: "sưu tầm", englishExample: "I collect stamps. / My brother collects coins.", vietnameseExample: "Tôi sưu tầm tem. / Anh tôi sưu tầm tiền xu." },
            { english: "collection", vietnamese: "bộ sưu tập", englishExample: "I have a big stamp collection. / His coin collection is amazing.", vietnameseExample: "Tôi có bộ sưu tập tem lớn. / Bộ sưu tập tiền xu của anh ấy thật ấn tượng." },
            { english: "draw", vietnamese: "vẽ", englishExample: "I like drawing animals. / She can draw very well.", vietnameseExample: "Tôi thích vẽ động vật. / Cô ấy vẽ rất đẹp." },
            { english: "paint", vietnamese: "tô / vẽ tranh", englishExample: "My sister paints flowers. / He paints pictures in his free time.", vietnameseExample: "Chị tôi vẽ hoa. / Cậu ấy vẽ tranh khi rảnh." },
            { english: "singing", vietnamese: "ca hát", englishExample: "She likes singing English songs. / Singing makes her happy.", vietnameseExample: "Cô ấy thích hát bài tiếng Anh. / Hát làm cô ấy vui." },
            { english: "dancing", vietnamese: "nhảy múa", englishExample: "They enjoy dancing together. / Dancing is fun.", vietnameseExample: "Họ thích nhảy cùng nhau. / Nhảy múa rất vui." },
            { english: "reading", vietnamese: "đọc sách", englishExample: "Reading is my favorite hobby. / I spend time reading every night.", vietnameseExample: "Đọc sách là sở thích của tôi. / Tôi dành thời gian đọc mỗi tối." },
            { english: "writing", vietnamese: "viết", englishExample: "He likes writing stories. / Writing English is not easy.", vietnameseExample: "Cậu ấy thích viết truyện. / Viết tiếng Anh không dễ." },
            { english: "listening to music", vietnamese: "nghe nhạc", englishExample: "I listen to music after school. / She listens to pop music.", vietnameseExample: "Tôi nghe nhạc sau giờ học. / Cô ấy nghe nhạc pop." },
            { english: "watching TV", vietnamese: "xem tivi", englishExample: "I like watching cartoons on TV. / My grandparents watch TV every night.", vietnameseExample: "Tôi thích xem phim hoạt hình trên TV. / Ông bà tôi xem TV mỗi tối." },
            { english: "taking photos", vietnamese: "chụp ảnh", englishExample: "My hobby is taking photos. / She likes taking photos of flowers.", vietnameseExample: "Sở thích của tôi là chụp ảnh. / Cô ấy thích chụp ảnh hoa." },
            { english: "gardening", vietnamese: "làm vườn", englishExample: "My father loves gardening. / Gardening is relaxing.", vietnameseExample: "Bố tôi thích làm vườn. / Làm vườn thật thư giãn." },
            { english: "cooking", vietnamese: "nấu ăn", englishExample: "My mother likes cooking. / Cooking is my hobby.", vietnameseExample: "Mẹ tôi thích nấu ăn. / Nấu ăn là sở thích của tôi." },
            { english: "fishing", vietnamese: "câu cá", englishExample: "My uncle goes fishing every weekend. / Fishing is a quiet hobby.", vietnameseExample: "Chú tôi đi câu cá mỗi cuối tuần. / Câu cá là sở thích yên tĩnh." },
            { english: "camping", vietnamese: "cắm trại", englishExample: "We go camping in summer. / Camping is fun for students.", vietnameseExample: "Chúng tôi đi cắm trại vào mùa hè. / Cắm trại rất vui với học sinh." },
            { english: "picnic", vietnamese: "dã ngoại", englishExample: "We have a picnic in the park. / The picnic was wonderful.", vietnameseExample: "Chúng tôi đi dã ngoại trong công viên. / Buổi dã ngoại thật tuyệt." },
            { english: "climb", vietnamese: "leo núi / trèo", englishExample: "They like climbing mountains. / I can climb a tree.", vietnameseExample: "Họ thích leo núi. / Tôi có thể trèo cây." },
            { english: "swim", vietnamese: "bơi", englishExample: "I can swim fast. / She swims in the pool.", vietnameseExample: "Tôi có thể bơi nhanh. / Cô ấy bơi trong hồ." },
            { english: "run", vietnamese: "chạy", englishExample: "He runs every morning. / The boy runs very fast.", vietnameseExample: "Cậu ấy chạy mỗi sáng. / Cậu bé chạy rất nhanh." },
            { english: "win", vietnamese: "thắng", englishExample: "Our team wins the game. / I want to win a medal.", vietnameseExample: "Đội chúng tôi thắng trận đấu. / Tôi muốn giành huy chương." },
            { english: "lose", vietnamese: "thua", englishExample: "We lost the match. / Don’t be sad if you lose.", vietnameseExample: "Chúng tôi thua trận. / Đừng buồn nếu thua." },
            { english: "player", vietnamese: "người chơi / vận động viên", englishExample: "He is a good football player. / There are ten players on the team.", vietnameseExample: "Cậu ấy là cầu thủ giỏi. / Có 10 người chơi trong đội." },
            { english: "team", vietnamese: "đội", englishExample: "My team plays very well. / There are eleven players in a football team.", vietnameseExample: "Đội của tôi chơi rất hay. / Đội bóng có 11 cầu thủ." },
            { english: "match / game", vietnamese: "trận đấu / trò chơi", englishExample: "We have a football match today. / That was an exciting game.", vietnameseExample: "Hôm nay chúng tôi có trận bóng. / Đó là trận đấu thú vị." },
            { english: "goal", vietnamese: "bàn thắng / khung thành", englishExample: "He scored two goals. / The ball goes into the goal.", vietnameseExample: "Cậu ấy ghi hai bàn thắng. / Bóng bay vào khung thành." },
            { english: "ball", vietnamese: "quả bóng", englishExample: "The ball is on the ground. / Don’t kick the ball too hard.", vietnameseExample: "Quả bóng nằm trên đất. / Đừng đá bóng mạnh quá." },
            { english: "bat", vietnamese: "gậy / vợt", englishExample: "He holds a baseball bat. / Use your bat to hit the ball.", vietnameseExample: "Cậu ấy cầm gậy bóng chày. / Dùng gậy đánh bóng." },
            { english: "net", vietnamese: "lưới", englishExample: "The ball goes over the net. / The tennis net is high.", vietnameseExample: "Bóng bay qua lưới. / Lưới tennis cao." },
            { english: "uniform", vietnamese: "đồng phục / trang phục thi đấu", englishExample: "The players wear blue uniforms. / Our team has new uniforms.", vietnameseExample: "Cầu thủ mặc đồng phục xanh. / Đội chúng tôi có đồng phục mới." },
            { english: "stadium", vietnamese: "sân vận động", englishExample: "The match is at the stadium. / There are many fans in the stadium.", vietnameseExample: "Trận đấu diễn ra ở sân vận động. / Có nhiều cổ động viên trong sân." },
            { english: "fan", vietnamese: "người hâm mộ", englishExample: "There are many football fans. / I’m a big fan of Ronaldo.", vietnameseExample: "Có nhiều người hâm mộ bóng đá. / Tôi là fan lớn của Ronaldo." },
            { english: "referee", vietnamese: "trọng tài", englishExample: "The referee starts the match. / The referee blows the whistle.", vietnameseExample: "Trọng tài bắt đầu trận đấu. / Trọng tài thổi còi." }
        ]
    },
    {
        title: "Chủ đề 12 – Daily Activities & Free Time",
        words: [
            { english: "daily routine", vietnamese: "thói quen hàng ngày", englishExample: "My daily routine starts at 6 a.m. / Everyone has a daily routine.", vietnameseExample: "Thói quen hàng ngày của tôi bắt đầu lúc 6 giờ sáng. / Ai cũng có thói quen hàng ngày." },
            { english: "get up", vietnamese: "thức dậy", englishExample: "I get up at six o’clock. / She gets up early every day.", vietnameseExample: "Tôi thức dậy lúc sáu giờ. / Cô ấy dậy sớm mỗi ngày." },
            { english: "wake up", vietnamese: "tỉnh dậy", englishExample: "I wake up before my alarm rings. / He wakes up late on Sundays.", vietnameseExample: "Tôi tỉnh dậy trước khi chuông reo. / Cậu ấy dậy muộn vào Chủ nhật." },
            { english: "wash face", vietnamese: "rửa mặt", englishExample: "I wash my face with water. / She washes her face after waking up.", vietnameseExample: "Tôi rửa mặt bằng nước. / Cô ấy rửa mặt sau khi tỉnh dậy." },
            { english: "brush teeth", vietnamese: "đánh răng", englishExample: "I brush my teeth twice a day. / Don’t forget to brush your teeth.", vietnameseExample: "Tôi đánh răng hai lần một ngày. / Đừng quên đánh răng." },
            { english: "take a shower / have a bath", vietnamese: "tắm", englishExample: "I take a shower every morning. / She has a bath in the evening.", vietnameseExample: "Tôi tắm mỗi sáng. / Cô ấy tắm buổi tối." },
            { english: "get dressed", vietnamese: "mặc quần áo", englishExample: "I get dressed before breakfast. / He gets dressed quickly.", vietnameseExample: "Tôi mặc quần áo trước khi ăn sáng. / Cậu ấy mặc rất nhanh." },
            { english: "have breakfast", vietnamese: "ăn sáng", englishExample: "I have breakfast at seven o’clock. / We have bread and milk for breakfast.", vietnameseExample: "Tôi ăn sáng lúc bảy giờ. / Chúng tôi ăn bánh mì và sữa vào bữa sáng." },
            { english: "go to school", vietnamese: "đi học", englishExample: "I go to school by bike. / We go to school at half past six.", vietnameseExample: "Tôi đi học bằng xe đạp. / Chúng tôi đi học lúc 6 giờ rưỡi." },
            { english: "have classes", vietnamese: "học tiết", englishExample: "We have four classes in the morning. / Our first class starts at 7 a.m.", vietnameseExample: "Chúng tôi có bốn tiết học buổi sáng. / Tiết đầu bắt đầu lúc 7 giờ." },
            { english: "study", vietnamese: "học", englishExample: "I study English every day. / She studies hard for the exam.", vietnameseExample: "Tôi học tiếng Anh mỗi ngày. / Cô ấy học chăm để thi." },
            { english: "do homework", vietnamese: "làm bài tập về nhà", englishExample: "I do my homework after dinner. / He always does his homework carefully.", vietnameseExample: "Tôi làm bài sau bữa tối. / Cậu ấy luôn làm bài cẩn thận." },
            { english: "read books", vietnamese: "đọc sách", englishExample: "I like reading English books. / She reads books before bed.", vietnameseExample: "Tôi thích đọc sách tiếng Anh. / Cô ấy đọc sách trước khi ngủ." },
            { english: "write", vietnamese: "viết", englishExample: "He writes in his notebook. / I write a diary every night.", vietnameseExample: "Cậu ấy viết trong vở. / Tôi viết nhật ký mỗi tối." },
            { english: "have lunch", vietnamese: "ăn trưa", englishExample: "We have lunch at school. / I have rice and soup for lunch.", vietnameseExample: "Chúng tôi ăn trưa ở trường. / Tôi ăn cơm và canh cho bữa trưa." },
            { english: "take a nap", vietnamese: "ngủ trưa", englishExample: "My father takes a nap after lunch. / I take a short nap in the afternoon.", vietnameseExample: "Bố tôi ngủ trưa sau bữa ăn. / Tôi chợp mắt buổi chiều." },
            { english: "play with friends", vietnamese: "chơi với bạn", englishExample: "I play with my friends after school. / They play with friends at the park.", vietnameseExample: "Tôi chơi với bạn sau giờ học. / Họ chơi với bạn ở công viên." },
            { english: "go home", vietnamese: "về nhà", englishExample: "I go home at five o’clock. / We go home together.", vietnameseExample: "Tôi về nhà lúc 5 giờ. / Chúng tôi về cùng nhau." },
            { english: "watch TV", vietnamese: "xem tivi", englishExample: "I watch cartoons on TV. / My family watches TV after dinner.", vietnameseExample: "Tôi xem phim hoạt hình. / Gia đình tôi xem TV sau bữa tối." },
            { english: "listen to music", vietnamese: "nghe nhạc", englishExample: "She listens to music every evening. / I like listening to pop music.", vietnameseExample: "Cô ấy nghe nhạc mỗi tối. / Tôi thích nghe nhạc pop." },
            { english: "play games", vietnamese: "chơi trò chơi", englishExample: "He plays computer games after school. / Don’t play games too long.", vietnameseExample: "Cậu ấy chơi game sau giờ học. / Đừng chơi game quá lâu." },
            { english: "surf the Internet", vietnamese: "lướt Internet", englishExample: "I surf the Internet in my free time. / She surfs the Internet to learn English.", vietnameseExample: "Tôi lướt mạng lúc rảnh. / Cô ấy lướt mạng để học tiếng Anh." },
            { english: "help parents", vietnamese: "giúp bố mẹ", englishExample: "I help my parents with the housework. / She helps her mother cook.", vietnameseExample: "Tôi giúp bố mẹ làm việc nhà. / Cô ấy giúp mẹ nấu ăn." },
            { english: "cook", vietnamese: "nấu ăn", englishExample: "My mother cooks dinner. / I can cook noodles.", vietnameseExample: "Mẹ tôi nấu bữa tối. / Tôi biết nấu mì." },
            { english: "clean", vietnamese: "dọn dẹp", englishExample: "I clean my room every Sunday. / She cleans the floor after lunch.", vietnameseExample: "Tôi dọn phòng mỗi Chủ nhật. / Cô ấy lau sàn sau bữa trưa." },
            { english: "wash dishes", vietnamese: "rửa chén", englishExample: "I wash the dishes after dinner. / He washes the dishes with his sister.", vietnameseExample: "Tôi rửa chén sau khi ăn. / Cậu ấy rửa chén cùng em gái." },
            { english: "do the laundry", vietnamese: "giặt đồ", englishExample: "My mom does the laundry on Saturdays. / I help her do the laundry.", vietnameseExample: "Mẹ tôi giặt đồ vào thứ Bảy. / Tôi giúp mẹ giặt đồ." },
            { english: "water the plants", vietnamese: "tưới cây", englishExample: "I water the plants every morning. / She waters the plants in the garden.", vietnameseExample: "Tôi tưới cây mỗi sáng. / Cô ấy tưới cây trong vườn." },
            { english: "feed the pets", vietnamese: "cho thú ăn", englishExample: "I feed my dog before school. / He feeds the cat every day.", vietnameseExample: "Tôi cho chó ăn trước khi đi học. / Cậu ấy cho mèo ăn mỗi ngày." },
            { english: "take care of", vietnamese: "chăm sóc", englishExample: "She takes care of her little brother. / I take care of my pet fish.", vietnameseExample: "Cô ấy chăm em trai. / Tôi chăm cá cảnh." },
            { english: "have dinner", vietnamese: "ăn tối", englishExample: "We have dinner at seven. / I have dinner with my family.", vietnameseExample: "Chúng tôi ăn tối lúc 7 giờ. / Tôi ăn tối với gia đình." },
            { english: "go shopping", vietnamese: "đi mua sắm", englishExample: "My mom goes shopping at the supermarket. / We go shopping on Sundays.", vietnameseExample: "Mẹ tôi đi mua sắm ở siêu thị. / Chúng tôi đi mua sắm vào Chủ nhật." },
            { english: "talk with friends", vietnamese: "trò chuyện với bạn", englishExample: "I talk with my friends online. / She talks with friends at school.", vietnameseExample: "Tôi trò chuyện với bạn qua mạng. / Cô ấy nói chuyện với bạn ở trường." },
            { english: "do housework", vietnamese: "làm việc nhà", englishExample: "I do housework at the weekend. / My sister helps with the housework.", vietnameseExample: "Tôi làm việc nhà cuối tuần. / Chị tôi giúp làm việc nhà." },
            { english: "go out", vietnamese: "đi ra ngoài", englishExample: "We go out on Saturday evenings. / I go out with my family.", vietnameseExample: "Chúng tôi ra ngoài vào tối thứ Bảy. / Tôi ra ngoài cùng gia đình." },
            { english: "visit grandparents", vietnamese: "thăm ông bà", englishExample: "I visit my grandparents every month. / We visit our grandparents on holidays.", vietnameseExample: "Tôi thăm ông bà mỗi tháng. / Chúng tôi thăm ông bà dịp lễ." },
            { english: "go to bed", vietnamese: "đi ngủ", englishExample: "I go to bed at ten o’clock. / She goes to bed late.", vietnameseExample: "Tôi đi ngủ lúc 10 giờ. / Cô ấy đi ngủ muộn." },
            { english: "sleep", vietnamese: "ngủ", englishExample: "I sleep for eight hours. / Babies sleep a lot.", vietnameseExample: "Tôi ngủ 8 tiếng. / Em bé ngủ nhiều." },
            { english: "free time", vietnamese: "thời gian rảnh", englishExample: "What do you do in your free time? / I read books in my free time.", vietnameseExample: "Bạn làm gì lúc rảnh? / Tôi đọc sách lúc rảnh." },
            { english: "relax", vietnamese: "thư giãn", englishExample: "I relax after school. / Listening to music helps me relax.", vietnameseExample: "Tôi thư giãn sau giờ học. / Nghe nhạc giúp tôi thư giãn." },
            { english: "rest", vietnamese: "nghỉ ngơi", englishExample: "You should rest after working hard. / I take a rest in the afternoon.", vietnameseExample: "Bạn nên nghỉ sau khi làm việc. / Tôi nghỉ ngơi buổi chiều." },
            { english: "sometimes", vietnamese: "đôi khi", englishExample: "I sometimes watch TV after dinner. / She sometimes goes jogging.", vietnameseExample: "Tôi đôi khi xem TV sau bữa tối. / Cô ấy đôi khi đi chạy bộ." },
            { english: "usually", vietnamese: "thường xuyên", englishExample: "I usually get up early. / We usually go to school at 6:30.", vietnameseExample: "Tôi thường dậy sớm. / Chúng tôi thường đi học lúc 6:30." },
            { english: "always", vietnamese: "luôn luôn", englishExample: "She always helps her mom. / I always brush my teeth before bed.", vietnameseExample: "Cô ấy luôn giúp mẹ. / Tôi luôn đánh răng trước khi ngủ." },
            { english: "often", vietnamese: "thường", englishExample: "He often plays football. / We often read books together.", vietnameseExample: "Cậu ấy thường chơi bóng đá. / Chúng tôi thường đọc sách cùng nhau." },
            { english: "never", vietnamese: "không bao giờ", englishExample: "I never eat fast food. / She never goes to bed late.", vietnameseExample: "Tôi không bao giờ ăn đồ nhanh. / Cô ấy không bao giờ ngủ muộn." },
            { english: "in the morning", vietnamese: "vào buổi sáng", englishExample: "I study in the morning. / She drinks milk in the morning.", vietnameseExample: "Tôi học vào buổi sáng. / Cô ấy uống sữa buổi sáng." },
            { english: "in the afternoon", vietnamese: "vào buổi chiều", englishExample: "We play games in the afternoon. / I take a nap in the afternoon.", vietnameseExample: "Chúng tôi chơi vào buổi chiều. / Tôi ngủ trưa buổi chiều." },
            { english: "in the evening", vietnamese: "vào buổi tối", englishExample: "I watch TV in the evening. / We study English in the evening.", vietnameseExample: "Tôi xem TV buổi tối. / Chúng tôi học tiếng Anh buổi tối." },
            { english: "at night", vietnamese: "vào ban đêm", englishExample: "I read books at night. / She sleeps at night.", vietnameseExample: "Tôi đọc sách ban đêm. / Cô ấy ngủ ban đêm." }
        ]
    },
    {
        title: "Chủ đề 13 – School Life",
        words: [
            { english: "school", vietnamese: "trường học", englishExample: "Our school is big and beautiful. / I go to school every day.", vietnameseExample: "Trường của chúng tôi lớn và đẹp. / Tôi đi học mỗi ngày." },
            { english: "classroom", vietnamese: "lớp học", englishExample: "Our classroom is clean. / There are 35 students in my classroom.", vietnameseExample: "Lớp học của chúng tôi sạch sẽ. / Có 35 học sinh trong lớp." },
            { english: "blackboard / board", vietnamese: "bảng", englishExample: "The teacher writes on the blackboard. / Please clean the board.", vietnameseExample: "Giáo viên viết lên bảng. / Làm ơn lau bảng." },
            { english: "chalk", vietnamese: "phấn", englishExample: "The teacher uses chalk to write. / There’s no chalk in the box.", vietnameseExample: "Giáo viên dùng phấn để viết. / Hộp không còn phấn." },
            { english: "desk", vietnamese: "bàn học", englishExample: "I sit at my desk. / Each student has a desk.", vietnameseExample: "Tôi ngồi ở bàn học của mình. / Mỗi học sinh có một bàn học." },
            { english: "chair", vietnamese: "ghế", englishExample: "There are many chairs in the room. / My chair is next to my friend’s.", vietnameseExample: "Có nhiều ghế trong phòng. / Ghế của tôi cạnh bạn." },
            { english: "schoolbag", vietnamese: "cặp sách", englishExample: "I carry books in my schoolbag. / Her schoolbag is new and red.", vietnameseExample: "Tôi mang sách trong cặp. / Cặp của cô ấy mới và màu đỏ." },
            { english: "book", vietnamese: "sách", englishExample: "I read an English book. / Put your books on the desk.", vietnameseExample: "Tôi đọc sách tiếng Anh. / Đặt sách lên bàn." },
            { english: "notebook", vietnamese: "vở ghi chép", englishExample: "Write in your notebook. / My notebook is full of notes.", vietnameseExample: "Viết vào vở của bạn. / Vở tôi đầy ghi chú." },
            { english: "ruler", vietnamese: "thước kẻ", englishExample: "Use your ruler to draw a line. / My ruler is 20 cm long.", vietnameseExample: "Dùng thước để kẻ dòng. / Thước của tôi dài 20 cm." },
            { english: "pencil", vietnamese: "bút chì", englishExample: "I draw with a pencil. / My pencil is sharp.", vietnameseExample: "Tôi vẽ bằng bút chì. / Bút chì của tôi nhọn." },
            { english: "pen", vietnamese: "bút mực", englishExample: "Write your name with a pen. / This blue pen is mine.", vietnameseExample: "Viết tên bằng bút. / Cây bút xanh này là của tôi." },
            { english: "eraser", vietnamese: "cục tẩy", englishExample: "I need an eraser. / The eraser is on the table.", vietnameseExample: "Tôi cần một cục tẩy. / Cục tẩy nằm trên bàn." },
            { english: "schoolyard", vietnamese: "sân trường", englishExample: "We play in the schoolyard. / The schoolyard is large and clean.", vietnameseExample: "Chúng tôi chơi ở sân trường. / Sân trường rộng và sạch." },
            { english: "canteen", vietnamese: "căn tin", englishExample: "We have lunch at the canteen. / The canteen sells drinks and food.", vietnameseExample: "Chúng tôi ăn trưa ở căn tin. / Căn tin bán đồ ăn và uống." },
            { english: "library", vietnamese: "thư viện", englishExample: "I read books in the library. / Our library is full of English books.", vietnameseExample: "Tôi đọc sách ở thư viện. / Thư viện có nhiều sách tiếng Anh." },
            { english: "laboratory", vietnamese: "phòng thí nghiệm", englishExample: "We study science in the laboratory. / The laboratory has many tools.", vietnameseExample: "Chúng tôi học khoa học trong phòng thí nghiệm. / Phòng thí nghiệm có nhiều dụng cụ." },
            { english: "subject", vietnamese: "môn học", englishExample: "My favorite subject is English. / We have many subjects at school.", vietnameseExample: "Môn yêu thích của tôi là tiếng Anh. / Chúng tôi có nhiều môn ở trường." },
            { english: "English", vietnamese: "tiếng Anh", englishExample: "We learn English on Mondays. / English is an important subject.", vietnameseExample: "Chúng tôi học tiếng Anh vào thứ Hai. / Tiếng Anh là môn quan trọng." },
            { english: "Math", vietnamese: "Toán học", englishExample: "I am good at Math. / Math is my favorite subject.", vietnameseExample: "Tôi giỏi Toán. / Toán là môn tôi thích." },
            { english: "Science", vietnamese: "Khoa học", englishExample: "Science is fun. / We do experiments in Science class.", vietnameseExample: "Môn Khoa học rất thú vị. / Chúng tôi làm thí nghiệm trong tiết Khoa học." },
            { english: "History", vietnamese: "Lịch sử", englishExample: "I learn about kings in History. / History tells us about the past.", vietnameseExample: "Tôi học về các vị vua trong Lịch sử. / Lịch sử kể về quá khứ." },
            { english: "Geography", vietnamese: "Địa lý", englishExample: "Geography helps me know countries. / We draw maps in Geography.", vietnameseExample: "Địa lý giúp tôi biết các nước. / Chúng tôi vẽ bản đồ trong môn Địa." },
            { english: "Music", vietnamese: "Âm nhạc", englishExample: "We sing songs in Music class. / I love my Music teacher.", vietnameseExample: "Chúng tôi hát trong tiết Âm nhạc. / Tôi yêu cô giáo dạy nhạc." },
            { english: "Art", vietnamese: "Mỹ thuật", englishExample: "I draw pictures in Art class. / Art is my favorite subject.", vietnameseExample: "Tôi vẽ tranh trong tiết Mỹ thuật. / Mỹ thuật là môn tôi thích." },
            { english: "Physical Education (PE)", vietnamese: "Thể dục", englishExample: "We play football in PE class. / PE helps us stay healthy.", vietnameseExample: "Chúng tôi chơi bóng trong tiết Thể dục. / Thể dục giúp chúng tôi khỏe." },
            { english: "Information Technology (IT)", vietnamese: "Tin học", englishExample: "We learn computers in IT class. / IT is useful for students.", vietnameseExample: "Chúng tôi học máy tính trong môn Tin. / Tin học rất hữu ích." },
            { english: "timetable", vietnamese: "thời khóa biểu", englishExample: "My timetable is full on Mondays. / Check your timetable, please.", vietnameseExample: "Thời khóa biểu của tôi kín vào thứ Hai. / Làm ơn kiểm tra thời khóa biểu." },
            { english: "break time", vietnamese: "giờ ra chơi", englishExample: "We play games at break time. / Break time is my favorite.", vietnameseExample: "Chúng tôi chơi trò chơi giờ ra chơi. / Giờ ra chơi là lúc tôi thích nhất." },
            { english: "lesson / class", vietnamese: "tiết học / buổi học", englishExample: "The first lesson is English. / We have five classes today.", vietnameseExample: "Tiết đầu là tiếng Anh. / Hôm nay chúng tôi có năm tiết." },
            { english: "homework", vietnamese: "bài tập về nhà", englishExample: "I always do my homework. / The teacher gives us homework every day.", vietnameseExample: "Tôi luôn làm bài tập. / Giáo viên giao bài tập mỗi ngày." },
            { english: "exam", vietnamese: "kỳ thi", englishExample: "The exam is next week. / I study hard for the exam.", vietnameseExample: "Kỳ thi diễn ra tuần sau. / Tôi học chăm để thi." },
            { english: "test", vietnamese: "bài kiểm tra", englishExample: "We have an English test today. / The test was very easy.", vietnameseExample: "Hôm nay chúng tôi có bài kiểm tra tiếng Anh. / Bài kiểm tra rất dễ." },
            { english: "mark / score", vietnamese: "điểm số", englishExample: "I get good marks in English. / What’s your score in Math?", vietnameseExample: "Tôi đạt điểm cao môn tiếng Anh. / Bạn được mấy điểm Toán?" },
            { english: "teacher", vietnamese: "giáo viên", englishExample: "My English teacher is kind. / The teacher writes on the board.", vietnameseExample: "Giáo viên tiếng Anh của tôi rất tốt. / Thầy viết lên bảng." },
            { english: "student", vietnamese: "học sinh", englishExample: "I am a student at Le Loi School. / Students are in the classroom now.", vietnameseExample: "Tôi là học sinh trường Lê Lợi. / Học sinh đang ở trong lớp." },
            { english: "head teacher", vietnamese: "giáo viên chủ nhiệm", englishExample: "Our head teacher is very nice. / The head teacher takes care of the class.", vietnameseExample: "Cô chủ nhiệm rất tốt. / Cô chủ nhiệm chăm lo cho lớp." },
            { english: "principal", vietnamese: "hiệu trưởng", englishExample: "The principal is in the office. / Our principal is strict but fair.", vietnameseExample: "Hiệu trưởng đang ở văn phòng. / Thầy hiệu trưởng nghiêm khắc nhưng công bằng." },
            { english: "monitor / class leader", vietnamese: "lớp trưởng", englishExample: "The class monitor helps the teacher. / She is our class leader.", vietnameseExample: "Lớp trưởng giúp cô giáo. / Cô ấy là lớp trưởng của chúng tôi." },
            { english: "schoolmate / classmate", vietnamese: "bạn cùng trường / cùng lớp", englishExample: "He is my classmate. / I like studying with my schoolmates.", vietnameseExample: "Cậu ấy là bạn cùng lớp tôi. / Tôi thích học với bạn cùng trường." },
            { english: "subject teacher", vietnamese: "giáo viên bộ môn", englishExample: "Our subject teachers are friendly. / The English subject teacher is new.", vietnameseExample: "Giáo viên bộ môn của chúng tôi thân thiện. / Cô dạy tiếng Anh là người mới." },
            { english: "uniform", vietnamese: "đồng phục", englishExample: "We wear uniforms at school. / Our uniforms are blue and white.", vietnameseExample: "Chúng tôi mặc đồng phục ở trường. / Đồng phục màu xanh trắng." },
            { english: "school rules", vietnamese: "nội quy trường", englishExample: "We must follow school rules. / School rules are important for students.", vietnameseExample: "Chúng tôi phải tuân theo nội quy. / Nội quy trường rất quan trọng." },
            { english: "assembly", vietnamese: "chào cờ / tập hợp", englishExample: "We have an assembly every Monday. / The assembly is in the schoolyard.", vietnameseExample: "Chúng tôi chào cờ mỗi thứ Hai. / Buổi chào cờ diễn ra ở sân trường." },
            { english: "extracurricular activity", vietnamese: "hoạt động ngoại khóa", englishExample: "We join extracurricular activities on weekends. / Extracurricular activities are fun.", vietnameseExample: "Chúng tôi tham gia hoạt động ngoại khóa cuối tuần. / Hoạt động ngoại khóa rất vui." },
            { english: "club", vietnamese: "câu lạc bộ", englishExample: "I am in the English club. / There are many clubs at school.", vietnameseExample: "Tôi ở câu lạc bộ tiếng Anh. / Trường có nhiều câu lạc bộ." },
            { english: "project", vietnamese: "dự án học tập", englishExample: "We do a science project. / Our project is about animals.", vietnameseExample: "Chúng tôi làm dự án khoa học. / Dự án của chúng tôi về động vật." },
            { english: "contest", vietnamese: "cuộc thi", englishExample: "We join a singing contest. / The contest was exciting.", vietnameseExample: "Chúng tôi tham gia cuộc thi hát. / Cuộc thi thật hào hứng." },
            { english: "prize", vietnamese: "giải thưởng", englishExample: "She won the first prize. / The teacher gave me a prize.", vietnameseExample: "Cô ấy thắng giải nhất. / Cô giáo trao giải thưởng cho tôi." },
            { english: "report card", vietnamese: "học bạ / phiếu điểm", englishExample: "I get my report card today. / My report card is very good.", vietnameseExample: "Tôi nhận học bạ hôm nay. / Học bạ của tôi rất tốt." },
            { english: "semester", vietnamese: "học kỳ", englishExample: "This is the second semester. / The semester ends in May.", vietnameseExample: "Đây là học kỳ hai. / Học kỳ kết thúc vào tháng Năm." },
            { english: "school year", vietnamese: "năm học", englishExample: "The school year starts in September. / We finish the school year in May.", vietnameseExample: "Năm học bắt đầu vào tháng Chín. / Chúng tôi kết thúc năm học vào tháng Năm." },
            { english: "vacation / holiday", vietnamese: "kỳ nghỉ", englishExample: "We have a long vacation in summer. / Our school holiday starts next week.", vietnameseExample: "Chúng tôi có kỳ nghỉ dài mùa hè. / Kỳ nghỉ bắt đầu tuần sau." },
            { english: "study hard", vietnamese: "học chăm chỉ", englishExample: "You should study hard for the exam. / He always studies hard at school.", vietnameseExample: "Bạn nên học chăm để thi tốt. / Cậu ấy luôn học chăm ở trường." },
            { english: "be late for", vietnamese: "đến muộn", englishExample: "Don’t be late for class. / I was late for school yesterday.", vietnameseExample: "Đừng đến muộn giờ học. / Hôm qua tôi đi học trễ." },
            { english: "on time", vietnamese: "đúng giờ", englishExample: "Try to come to school on time. / The teacher starts the class on time.", vietnameseExample: "Cố gắng đến trường đúng giờ. / Cô bắt đầu lớp đúng giờ." }
        ]
    },
    {
        title: "Chủ đề 14 – Subjects & Learning",
        words: [
            { english: "subject", vietnamese: "môn học", englishExample: "What’s your favorite subject? / We study many subjects at school.", vietnameseExample: "Môn học yêu thích của bạn là gì? / Chúng tôi học nhiều môn ở trường." },
            { english: "lesson", vietnamese: "tiết học", englishExample: "The English lesson starts at 8 o’clock. / We have four lessons in the morning.", vietnameseExample: "Tiết học tiếng Anh bắt đầu lúc 8 giờ. / Buổi sáng chúng tôi có bốn tiết." },
            { english: "timetable", vietnamese: "thời khóa biểu", englishExample: "My timetable is very full. / Check your timetable before class.", vietnameseExample: "Thời khóa biểu của tôi rất kín. / Kiểm tra thời khóa biểu trước giờ học." },
            { english: "homework", vietnamese: "bài tập về nhà", englishExample: "I always do my homework after dinner. / Don’t forget your homework!", vietnameseExample: "Tôi luôn làm bài tập sau bữa tối. / Đừng quên bài tập về nhà!" },
            { english: "exam", vietnamese: "kỳ thi", englishExample: "The exam is next week. / I study hard for the exam.", vietnameseExample: "Kỳ thi diễn ra tuần tới. / Tôi học chăm để thi." },
            { english: "test", vietnamese: "bài kiểm tra", englishExample: "We have a Science test today. / The test was easy.", vietnameseExample: "Hôm nay chúng tôi có bài kiểm tra Khoa học. / Bài kiểm tra rất dễ." },
            { english: "mark / score", vietnamese: "điểm số", englishExample: "I got a high mark in Math. / What’s your score in English?", vietnameseExample: "Tôi được điểm cao môn Toán. / Bạn được bao nhiêu điểm tiếng Anh?" },
            { english: "grade", vietnamese: "điểm / khối lớp", englishExample: "She is in grade 6. / My grades are very good.", vietnameseExample: "Cô ấy học lớp 6. / Điểm của tôi rất tốt." },
            { english: "student", vietnamese: "học sinh", englishExample: "Students study hard before exams. / I’m a new student.", vietnameseExample: "Học sinh học chăm trước kỳ thi. / Tôi là học sinh mới." },
            { english: "teacher", vietnamese: "giáo viên", englishExample: "My Math teacher is kind. / The teacher helps us with homework.", vietnameseExample: "Giáo viên Toán của tôi rất tốt. / Cô giáo giúp chúng tôi làm bài tập." },
            { english: "study", vietnamese: "học tập", englishExample: "I study English every day. / We study together after school.", vietnameseExample: "Tôi học tiếng Anh mỗi ngày. / Chúng tôi học cùng nhau sau giờ học." },
            { english: "learn", vietnamese: "học (một kỹ năng / ngôn ngữ)", englishExample: "I learn English at school. / She learns to play the piano.", vietnameseExample: "Tôi học tiếng Anh ở trường. / Cô ấy học chơi piano." },
            { english: "practice", vietnamese: "luyện tập", englishExample: "We practice speaking English. / Practice makes perfect.", vietnameseExample: "Chúng tôi luyện nói tiếng Anh. / Luyện tập giúp bạn hoàn hảo hơn." },
            { english: "read", vietnamese: "đọc", englishExample: "I read English stories. / Reading helps me learn new words.", vietnameseExample: "Tôi đọc truyện tiếng Anh. / Đọc giúp tôi học từ mới." },
            { english: "write", vietnamese: "viết", englishExample: "I write short paragraphs. / Write your answers clearly.", vietnameseExample: "Tôi viết đoạn ngắn. / Hãy viết câu trả lời rõ ràng." },
            { english: "listen", vietnamese: "nghe", englishExample: "I listen to English songs. / Listen carefully to your teacher.", vietnameseExample: "Tôi nghe bài hát tiếng Anh. / Hãy nghe cô giáo cẩn thận." },
            { english: "speak", vietnamese: "nói", englishExample: "I can speak English fluently. / Let’s speak English in class.", vietnameseExample: "Tôi có thể nói tiếng Anh trôi chảy. / Hãy nói tiếng Anh trong lớp." },
            { english: "repeat", vietnamese: "lặp lại", englishExample: "Repeat after me, please. / The teacher asks us to repeat the words.", vietnameseExample: "Làm ơn lặp lại theo tôi. / Cô yêu cầu chúng tôi nhắc lại các từ." },
            { english: "spell", vietnamese: "đánh vần", englishExample: "Can you spell your name? / I can spell “beautiful”.", vietnameseExample: "Bạn có thể đánh vần tên mình không? / Tôi có thể đánh vần từ “beautiful”." },
            { english: "answer", vietnamese: "trả lời", englishExample: "Please answer the question. / He answers very quickly.", vietnameseExample: "Làm ơn trả lời câu hỏi. / Cậu ấy trả lời rất nhanh." },
            { english: "question", vietnamese: "câu hỏi", englishExample: "I have a question. / The teacher asks many questions.", vietnameseExample: "Tôi có một câu hỏi. / Cô giáo đặt nhiều câu hỏi." },
            { english: "explain", vietnamese: "giải thích", englishExample: "Can you explain this word? / The teacher explains the lesson clearly.", vietnameseExample: "Bạn có thể giải thích từ này không? / Cô giáo giảng bài rõ ràng." },
            { english: "understand", vietnamese: "hiểu", englishExample: "I don’t understand this sentence. / Do you understand the lesson?", vietnameseExample: "Tôi không hiểu câu này. / Bạn hiểu bài không?" },
            { english: "remember", vietnamese: "nhớ", englishExample: "I can remember new words easily. / Try to remember this rule.", vietnameseExample: "Tôi dễ nhớ từ mới. / Hãy cố nhớ quy tắc này." },
            { english: "forget", vietnamese: "quên", englishExample: "Don’t forget your homework. / I forgot my book at home.", vietnameseExample: "Đừng quên bài tập. / Tôi quên sách ở nhà." },
            { english: "improve", vietnamese: "cải thiện", englishExample: "I want to improve my English. / Practice helps you improve fast.", vietnameseExample: "Tôi muốn cải thiện tiếng Anh. / Luyện tập giúp bạn tiến bộ nhanh." },
            { english: "be good at", vietnamese: "giỏi về", englishExample: "I’m good at English. / She is good at drawing.", vietnameseExample: "Tôi giỏi tiếng Anh. / Cô ấy giỏi vẽ." },
            { english: "be bad at", vietnamese: "kém về", englishExample: "I’m bad at Math. / He is bad at singing.", vietnameseExample: "Tôi kém môn Toán. / Cậu ấy hát dở." },
            { english: "easy", vietnamese: "dễ", englishExample: "English is easy for me. / This question is easy.", vietnameseExample: "Tiếng Anh dễ với tôi. / Câu hỏi này dễ." },
            { english: "difficult / hard", vietnamese: "khó", englishExample: "Math is difficult for me. / This test is very hard.", vietnameseExample: "Toán khó với tôi. / Bài kiểm tra này rất khó." },
            { english: "important", vietnamese: "quan trọng", englishExample: "English is an important subject. / It’s important to study hard.", vietnameseExample: "Tiếng Anh là môn quan trọng. / Học chăm là điều quan trọng." },
            { english: "useful", vietnamese: "hữu ích", englishExample: "Reading books is useful. / This lesson is very useful.", vietnameseExample: "Đọc sách rất hữu ích. / Bài học này rất bổ ích." },
            { english: "interesting", vietnamese: "thú vị", englishExample: "Science is interesting. / The lesson is very interesting.", vietnameseExample: "Môn Khoa học rất thú vị. / Bài học thật hấp dẫn." },
            { english: "boring", vietnamese: "nhàm chán", englishExample: "The lesson is boring. / I think History is boring.", vietnameseExample: "Bài học này nhàm chán. / Tôi nghĩ môn Lịch sử nhàm chán." },
            { english: "favorite", vietnamese: "yêu thích", englishExample: "My favorite subject is English. / What’s your favorite book?", vietnameseExample: "Môn học yêu thích của tôi là tiếng Anh. / Cuốn sách bạn thích là gì?" },
            { english: "classroom", vietnamese: "lớp học", englishExample: "There are 30 students in our classroom. / Our classroom is bright and big.", vietnameseExample: "Có 30 học sinh trong lớp. / Lớp học rộng và sáng." },
            { english: "library", vietnamese: "thư viện", englishExample: "I borrow books from the library. / The library is open all day.", vietnameseExample: "Tôi mượn sách từ thư viện. / Thư viện mở cả ngày." },
            { english: "computer room", vietnamese: "phòng máy tính", englishExample: "We study IT in the computer room. / The computer room has ten computers.", vietnameseExample: "Chúng tôi học Tin học trong phòng máy. / Phòng có 10 máy tính." },
            { english: "laboratory", vietnamese: "phòng thí nghiệm", englishExample: "We do experiments in the laboratory. / The laboratory is clean and modern.", vietnameseExample: "Chúng tôi làm thí nghiệm trong phòng lab. / Phòng thí nghiệm sạch và hiện đại." },
            { english: "exercise book", vietnamese: "vở bài tập", englishExample: "Open your exercise book. / Write answers in your exercise book.", vietnameseExample: "Mở vở bài tập ra. / Viết đáp án vào vở bài tập." },
            { english: "dictionary", vietnamese: "từ điển", englishExample: "Use your dictionary to find new words. / I always carry a dictionary.", vietnameseExample: "Dùng từ điển để tra từ mới. / Tôi luôn mang theo từ điển." },
            { english: "schoolwork", vietnamese: "việc học ở trường", englishExample: "Schoolwork is sometimes hard. / I finish my schoolwork before dinner.", vietnameseExample: "Việc học ở trường đôi khi khó. / Tôi làm xong việc học trước bữa tối." },
            { english: "knowledge", vietnamese: "kiến thức", englishExample: "Reading gives me more knowledge. / We get knowledge from books.", vietnameseExample: "Đọc sách giúp tôi có thêm kiến thức. / Chúng ta học kiến thức từ sách." },
            { english: "skill", vietnamese: "kỹ năng", englishExample: "Listening is an important skill. / We practice speaking skills in class.", vietnameseExample: "Kỹ năng nghe rất quan trọng. / Chúng tôi luyện kỹ năng nói trong lớp." },
            { english: "pronunciation", vietnamese: "phát âm", englishExample: "My pronunciation is not very good. / Practice your pronunciation every day.", vietnameseExample: "Phát âm của tôi chưa tốt. / Hãy luyện phát âm mỗi ngày." },
            { english: "grammar", vietnamese: "ngữ pháp", englishExample: "English grammar is not easy. / We study grammar in every lesson.", vietnameseExample: "Ngữ pháp tiếng Anh không dễ. / Chúng tôi học ngữ pháp trong mỗi tiết." },
            { english: "vocabulary", vietnamese: "từ vựng", englishExample: "I learn five new words a day. / Vocabulary helps me speak better.", vietnameseExample: "Tôi học năm từ mới mỗi ngày. / Từ vựng giúp tôi nói tốt hơn." },
            { english: "sentence", vietnamese: "câu", englishExample: "Write five English sentences. / The sentence is very short.", vietnameseExample: "Viết năm câu tiếng Anh. / Câu này rất ngắn." },
            { english: "paragraph", vietnamese: "đoạn văn", englishExample: "Write a short paragraph about your school. / This paragraph is too long.", vietnameseExample: "Viết đoạn ngắn về trường bạn. / Đoạn văn này quá dài." },
            { english: "essay", vietnamese: "bài luận", englishExample: "I write an essay about my hobby. / The essay must be 100 words long.", vietnameseExample: "Tôi viết bài luận về sở thích. / Bài luận phải dài 100 từ." },
            { english: "presentation", vietnamese: "thuyết trình", englishExample: "We give a presentation in class. / Her presentation is excellent.", vietnameseExample: "Chúng tôi thuyết trình trong lớp. / Bài thuyết trình của cô ấy rất xuất sắc." },
            { english: "answer", vietnamese: "câu trả lời", englishExample: "The answer is correct. / Write your answer on the board.", vietnameseExample: "Câu trả lời đúng. / Viết đáp án lên bảng." },
            { english: "revision", vietnamese: "ôn tập", englishExample: "We do revision before the exam. / Revision helps me remember lessons.", vietnameseExample: "Chúng tôi ôn tập trước kỳ thi. / Ôn tập giúp tôi nhớ bài." },
            { english: "group work", vietnamese: "làm việc nhóm", englishExample: "We often do group work in English class. / Group work is fun and helpful.", vietnameseExample: "Chúng tôi thường làm việc nhóm trong tiết tiếng Anh. / Làm nhóm vui và hữu ích." },
            { english: "discussion", vietnamese: "thảo luận", englishExample: "We have a discussion about pollution. / Discussion helps us share ideas.", vietnameseExample: "Chúng tôi thảo luận về ô nhiễm. / Thảo luận giúp chúng tôi chia sẻ ý kiến." },
            { english: "project", vietnamese: "dự án", englishExample: "We make a project about animals. / The project is very creative.", vietnameseExample: "Chúng tôi làm dự án về động vật. / Dự án rất sáng tạo." },
            { english: "competition", vietnamese: "cuộc thi", englishExample: "There’s an English competition next month. / I want to win the competition.", vietnameseExample: "Tháng sau có cuộc thi tiếng Anh. / Tôi muốn thắng cuộc thi đó." },
            { english: "extracurricular", vietnamese: "ngoại khóa", englishExample: "I join many extracurricular clubs. / Extracurricular activities are exciting.", vietnameseExample: "Tôi tham gia nhiều câu lạc bộ ngoại khóa. / Hoạt động ngoại khóa rất thú vị." }
        ]
    },
    {
        title: "Chủ đề 15 – Classroom Objects & School Supplies",
        words: [
            { english: "classroom", vietnamese: "lớp học", englishExample: "The classroom is big and clean. / There are many desks in our classroom.", vietnameseExample: "Lớp học rộng và sạch. / Có nhiều bàn trong lớp học." },
            { english: "desk", vietnamese: "bàn học", englishExample: "I sit at my desk. / There’s a pen on my desk.", vietnameseExample: "Tôi ngồi ở bàn học của mình. / Có cây bút trên bàn." },
            { english: "chair", vietnamese: "ghế", englishExample: "My chair is near the window. / There are thirty chairs in the room.", vietnameseExample: "Ghế của tôi ở gần cửa sổ. / Có 30 cái ghế trong phòng." },
            { english: "table", vietnamese: "bàn", englishExample: "The teacher’s table is in front of the class. / Put the books on the table.", vietnameseExample: "Bàn của cô ở trước lớp. / Đặt sách lên bàn." },
            { english: "blackboard / board", vietnamese: "bảng", englishExample: "The teacher writes on the blackboard. / Please clean the board.", vietnameseExample: "Cô giáo viết lên bảng. / Làm ơn lau bảng." },
            { english: "chalk", vietnamese: "phấn viết", englishExample: "The teacher uses chalk to write. / We need more chalk for the board.", vietnameseExample: "Cô giáo dùng phấn để viết. / Chúng tôi cần thêm phấn cho bảng." },
            { english: "marker", vietnamese: "bút dạ", englishExample: "The teacher writes with a marker. / Don’t forget to close the marker cap.", vietnameseExample: "Cô viết bằng bút dạ. / Đừng quên đậy nắp bút dạ." },
            { english: "whiteboard", vietnamese: "bảng trắng", englishExample: "We use a whiteboard in class. / The whiteboard is behind the teacher.", vietnameseExample: "Chúng tôi dùng bảng trắng trong lớp. / Bảng trắng ở sau cô giáo." },
            { english: "projector", vietnamese: "máy chiếu", englishExample: "The teacher uses a projector for lessons. / The projector shows pictures on the wall.", vietnameseExample: "Cô giáo dùng máy chiếu trong giờ học. / Máy chiếu hiển thị hình lên tường." },
            { english: "screen", vietnamese: "màn hình", englishExample: "Look at the screen, please. / The screen is very bright.", vietnameseExample: "Hãy nhìn lên màn hình. / Màn hình rất sáng." },
            { english: "computer", vietnamese: "máy tính", englishExample: "There’s a computer on the teacher’s desk. / We use computers in IT class.", vietnameseExample: "Có máy tính trên bàn cô giáo. / Chúng tôi dùng máy tính trong tiết Tin." },
            { english: "laptop", vietnamese: "máy tính xách tay", englishExample: "I do homework on my laptop. / The teacher brings a laptop to class.", vietnameseExample: "Tôi làm bài trên laptop. / Cô mang laptop đến lớp." },
            { english: "book", vietnamese: "sách", englishExample: "Open your English book. / I read books in the library.", vietnameseExample: "Mở sách tiếng Anh ra. / Tôi đọc sách trong thư viện." },
            { english: "notebook", vietnamese: "vở ghi chép", englishExample: "Write your homework in your notebook. / My notebook is blue.", vietnameseExample: "Viết bài tập vào vở của bạn. / Vở của tôi màu xanh." },
            { english: "workbook", vietnamese: "vở bài tập", englishExample: "Do exercises in your workbook. / My workbook is very thick.", vietnameseExample: "Làm bài trong vở bài tập. / Vở bài tập của tôi dày lắm." },
            { english: "paper", vietnamese: "giấy", englishExample: "I need a piece of paper. / Don’t waste paper.", vietnameseExample: "Tôi cần một tờ giấy. / Đừng lãng phí giấy." },
            { english: "notebook paper", vietnamese: "giấy vở học sinh", englishExample: "Write your answers on notebook paper. / I bought some notebook paper.", vietnameseExample: "Viết đáp án vào giấy vở. / Tôi mua vài tờ giấy vở." },
            { english: "pen", vietnamese: "bút mực", englishExample: "I write with a blue pen. / Can I borrow your pen?", vietnameseExample: "Tôi viết bằng bút mực xanh. / Tôi có thể mượn bút của bạn không?" },
            { english: "pencil", vietnamese: "bút chì", englishExample: "I draw with a pencil. / Sharpen your pencil, please.", vietnameseExample: "Tôi vẽ bằng bút chì. / Làm ơn gọt bút chì." },
            { english: "eraser", vietnamese: "cục tẩy", englishExample: "I need an eraser. / The eraser is small and white.", vietnameseExample: "Tôi cần một cục tẩy. / Cục tẩy nhỏ và màu trắng." },
            { english: "ruler", vietnamese: "thước kẻ", englishExample: "Use your ruler to draw a line. / My ruler is 20 cm long.", vietnameseExample: "Dùng thước để kẻ đường. / Thước của tôi dài 20 cm." },
            { english: "pencil case", vietnamese: "hộp bút", englishExample: "I keep my pens in a pencil case. / My pencil case is full.", vietnameseExample: "Tôi cất bút trong hộp bút. / Hộp bút của tôi đầy." },
            { english: "schoolbag", vietnamese: "cặp sách", englishExample: "My schoolbag is heavy. / I put books in my schoolbag.", vietnameseExample: "Cặp của tôi nặng. / Tôi bỏ sách vào cặp." },
            { english: "backpack", vietnamese: "ba lô", englishExample: "This backpack is very light. / I carry my backpack to school.", vietnameseExample: "Ba lô này rất nhẹ. / Tôi mang ba lô đến trường." },
            { english: "sharpener", vietnamese: "gọt bút chì", englishExample: "I use a sharpener to sharpen pencils. / Where’s my pencil sharpener?", vietnameseExample: "Tôi dùng đồ gọt để gọt bút chì. / Cái gọt bút chì của tôi đâu rồi?" },
            { english: "glue", vietnamese: "keo dán", englishExample: "Use glue to stick the pictures. / I need some glue for my project.", vietnameseExample: "Dùng keo để dán hình. / Tôi cần keo cho dự án." },
            { english: "scissors", vietnamese: "kéo", englishExample: "Don’t run with scissors. / I use scissors to cut paper.", vietnameseExample: "Đừng chạy khi cầm kéo. / Tôi dùng kéo cắt giấy." },
            { english: "crayon", vietnamese: "bút sáp màu", englishExample: "The children draw with crayons. / I have a box of crayons.", vietnameseExample: "Trẻ con vẽ bằng bút sáp. / Tôi có hộp bút sáp màu." },
            { english: "colored pencils", vietnamese: "bút chì màu", englishExample: "She colors pictures with colored pencils. / I bought new colored pencils.", vietnameseExample: "Cô ấy tô tranh bằng chì màu. / Tôi mua bộ chì màu mới." },
            { english: "highlighter", vietnamese: "bút dạ quang", englishExample: "Use a highlighter to mark new words. / My highlighter is yellow.", vietnameseExample: "Dùng bút dạ quang đánh dấu từ mới. / Bút dạ quang của tôi màu vàng." },
            { english: "stapler", vietnamese: "dập ghim", englishExample: "The stapler is on the desk. / Please staple these papers together.", vietnameseExample: "Cái dập ghim ở trên bàn. / Làm ơn ghim các tờ này lại." },
            { english: "tape", vietnamese: "băng keo", englishExample: "I use tape to fix my notebook. / Can you pass me the tape?", vietnameseExample: "Tôi dùng băng keo dán vở. / Bạn đưa tôi băng keo nhé." },
            { english: "envelope", vietnamese: "phong bì", englishExample: "Put the letter in the envelope. / I need an envelope for my project.", vietnameseExample: "Bỏ thư vào phong bì. / Tôi cần phong bì cho bài làm." },
            { english: "folder", vietnamese: "bìa đựng hồ sơ", englishExample: "I keep my papers in a folder. / The folder is on the shelf.", vietnameseExample: "Tôi giữ giấy tờ trong bìa. / Bìa đựng ở trên kệ." },
            { english: "dictionary", vietnamese: "từ điển", englishExample: "Use a dictionary to find meanings. / I have an English-Vietnamese dictionary.", vietnameseExample: "Dùng từ điển để tra nghĩa. / Tôi có từ điển Anh – Việt." },
            { english: "map", vietnamese: "bản đồ", englishExample: "There’s a world map on the wall. / The teacher shows us the map of Asia.", vietnameseExample: "Có bản đồ thế giới trên tường. / Cô chỉ chúng tôi bản đồ châu Á." },
            { english: "poster", vietnamese: "áp phích", englishExample: "We make posters for the classroom. / The poster is about the environment.", vietnameseExample: "Chúng tôi làm áp phích cho lớp học. / Áp phích nói về môi trường." },
            { english: "picture", vietnamese: "bức tranh", englishExample: "There are pictures on the wall. / I draw a picture of my school.", vietnameseExample: "Có tranh treo trên tường. / Tôi vẽ tranh về trường tôi." },
            { english: "wall clock", vietnamese: "đồng hồ treo tường", englishExample: "The wall clock shows eight o’clock. / Look at the clock, class!", vietnameseExample: "Đồng hồ treo tường chỉ 8 giờ. / Cả lớp, nhìn đồng hồ nào!" },
            { english: "calendar", vietnamese: "lịch", englishExample: "The calendar is next to the door. / Check the calendar for holidays.", vietnameseExample: "Lịch ở cạnh cửa. / Kiểm tra lịch để xem ngày nghỉ." },
            { english: "door", vietnamese: "cửa ra vào", englishExample: "Close the door, please. / The door is open.", vietnameseExample: "Làm ơn đóng cửa. / Cửa đang mở." },
            { english: "window", vietnamese: "cửa sổ", englishExample: "Open the window, please. / The window is very big.", vietnameseExample: "Làm ơn mở cửa sổ. / Cửa sổ rất to." },
            { english: "floor", vietnamese: "sàn nhà", englishExample: "The floor is clean. / Don’t drop papers on the floor.", vietnameseExample: "Sàn nhà sạch sẽ. / Đừng làm rơi giấy xuống sàn." },
            { english: "wall", vietnamese: "tường", englishExample: "There are posters on the wall. / The wall is painted white.", vietnameseExample: "Có tranh dán trên tường. / Tường được sơn trắng." },
            { english: "ceiling", vietnamese: "trần nhà", englishExample: "The ceiling is high. / There’s a fan on the ceiling.", vietnameseExample: "Trần nhà cao. / Có cái quạt trên trần." },
            { english: "light", vietnamese: "đèn", englishExample: "Turn on the light, please. / The light is too bright.", vietnameseExample: "Làm ơn bật đèn. / Đèn sáng quá." },
            { english: "fan", vietnamese: "quạt", englishExample: "The fan is on the ceiling. / Turn off the fan, please.", vietnameseExample: "Quạt ở trên trần. / Làm ơn tắt quạt." },
            { english: "cupboard", vietnamese: "tủ đựng đồ", englishExample: "The books are in the cupboard. / Open the cupboard and take the ruler.", vietnameseExample: "Sách ở trong tủ. / Mở tủ lấy thước ra." },
            { english: "shelf", vietnamese: "kệ / giá", englishExample: "The shelf is full of books. / Put the dictionary on the shelf.", vietnameseExample: "Kệ đầy sách. / Đặt từ điển lên kệ." },
            { english: "bin", vietnamese: "thùng rác", englishExample: "Throw the paper into the bin. / The bin is behind the door.", vietnameseExample: "Bỏ giấy vào thùng rác. / Thùng rác ở sau cửa." },
            { english: "clock", vietnamese: "đồng hồ", englishExample: "What time is it on the clock? / The clock is slow.", vietnameseExample: "Mấy giờ rồi trên đồng hồ? / Đồng hồ chạy chậm." },
            { english: "bell", vietnamese: "chuông", englishExample: "The school bell rings at seven. / The bell rings for break time.", vietnameseExample: "Chuông trường reo lúc 7 giờ. / Chuông báo giờ ra chơi." },
            { english: "flag", vietnamese: "lá cờ", englishExample: "The flag is red with a yellow star. / We raise the flag every Monday.", vietnameseExample: "Lá cờ màu đỏ có ngôi sao vàng. / Chúng tôi kéo cờ mỗi thứ Hai." }
        ]
    }
];

const SpeakerIcon = () => React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-8 w-8",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  },
  React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
  })
);

const TrophyIcon = () => React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-16 w-16",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  },
  React.createElement("path", { d: "M17.92,3.39a1,1,0,0,0-1.33-.22L12,6.1,7.41,3.17a1,1,0,0,0-1.33.22L2.1,9.45a1,1,0,0,0,0,1.1l2.1,6.28a1,1,0,0,0,1,.67H14.8a1,1,0,0,0,1-.67l2.1-6.28a1,1,0,0,0,0-1.1ZM13,16H7L5.5,12,3,9.4,4.5,7.4l3,2.25a1,1,0,0,0,1,0l3-2.25L13,9.4,14.5,12Z" })
);

interface WrongAnswersModalProps {
  isOpen: boolean;
  onClose: () => void;
  mistakes: Mistake[];
  onPracticeMistakes: () => void;
}

const WrongAnswersModal = ({ isOpen, onClose, mistakes, onPracticeMistakes }: WrongAnswersModalProps) => {
  if (!isOpen) {
    return null;
  }

  return React.createElement(
    "div",
    {
      className: "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50",
      onClick: onClose
    },
    React.createElement(
      "div",
      {
        className: "bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col",
        onClick: (e: React.MouseEvent) => e.stopPropagation()
      },
      React.createElement(
        "div",
        { className: "p-6 border-b border-gray-200 sticky top-0 bg-white" },
        React.createElement("h2", { className: "text-2xl font-bold text-gray-800" }, "Các từ cần xem lại"),
        React.createElement("p", { className: "text-gray-500" }, "Đây là những từ bạn đã làm sai.")
      ),
      React.createElement(
        "div",
        { className: "p-6 overflow-y-auto" },
        mistakes.length === 0
          ? React.createElement("p", { className: "text-center text-gray-500 py-8" }, "Chưa có lỗi sai nào. Làm tốt lắm!")
          : React.createElement(
              "ul",
              { className: "divide-y divide-gray-200" },
              ...mistakes.map((mistake, index) =>
                React.createElement(
                  "li",
                  {
                    key: index,
                    className: "py-4 flex flex-col items-start select-none",
                    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
                  },
                  React.createElement(
                    "div",
                    {
                      key: "word",
                      className: "flex justify-between items-center w-full",
                    },
                    React.createElement(
                      "span",
                      { className: "text-lg text-gray-800 font-medium" },
                      mistake.word.english
                    ),
                    React.createElement(
                      "span",
                      { className: "text-gray-600" },
                      mistake.word.vietnamese
                    )
                  ),
                  mistake.sentenceErrorCount > 0
                    ? React.createElement(
                        "p",
                        {
                          key: "sentence-error",
                          className: "text-sm font-semibold text-red-600 mt-1",
                        },
                        `Lỗi sai câu: ${mistake.sentenceErrorCount}`
                      )
                    : null,
                  mistake.word.englishExample
                    ? React.createElement(
                        "p",
                        {
                          key: "example",
                          className: "text-xl text-gray-500 mt-1 italic",
                        },
                        `VD: "${mistake.word.englishExample}"`
                      )
                    : null
                )
              )
            )
      ),
      React.createElement(
        "div",
        { className: "p-6 border-t border-gray-200 sticky bottom-0 bg-white space-y-2" },
         React.createElement(
          "button",
          {
            onClick: onPracticeMistakes,
            disabled: mistakes.length === 0,
            className: "w-full p-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          },
          `Luyện tập các lỗi sai (${mistakes.length})`
        ),
        React.createElement(
          "button",
          {
            onClick: onClose,
            className: "w-full p-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-colors"
          },
          "Đóng"
        )
      )
    )
  );
};

interface GameSummaryProps {
  score: number;
  total: number;
  onShowWrongAnswers: () => void;
  onNextTopic: () => void;
  onReturnToMenu: () => void;
  onPracticeMistakes: () => void;
  mistakesCount: number;
}

const GameSummary = ({ score, total, onShowWrongAnswers, onNextTopic, onReturnToMenu, onPracticeMistakes, mistakesCount }: GameSummaryProps) => {
  return React.createElement(
    "div",
    { className: "flex flex-col items-center justify-center min-h-screen p-4" },
    React.createElement(
      "div",
      { className: "w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-200" },
      React.createElement(
        "div", { className: "flex justify-center text-sky-400 mb-4" },
        React.createElement(TrophyIcon)
      ),
      React.createElement("h1", { className: "text-3xl font-bold text-sky-600 mb-2" }, "Hoàn thành chủ đề!"),
      React.createElement("p", { className: "text-gray-600 mb-6" }, "Làm tốt lắm! Đây là kết quả của bạn."),
      React.createElement(
        "div", { className: "my-8" },
        React.createElement("p", { className: "text-lg text-gray-800" }, "Điểm của bạn"),
        React.createElement("p", { className: "text-6xl font-bold text-green-500" }, score, React.createElement("span", { className: "text-3xl text-gray-500" }, `/${total}`))
      ),
      React.createElement(
        "div", { className: "space-y-3" },
        React.createElement("button", { onClick: onNextTopic, className: "w-full p-4 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-transform hover:scale-105 transform duration-200" }, "Chủ đề tiếp theo"),
        mistakesCount > 0 ? React.createElement("button", { onClick: onPracticeMistakes, className: "w-full p-4 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-transform hover:scale-105 transform duration-200" }, `Luyện tập lại ${mistakesCount} lỗi sai`) : null,
        React.createElement("button", { onClick: onShowWrongAnswers, className: "w-full p-4 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-transform hover:scale-105 transform duration-200" }, "Xem lại lỗi sai"),
        React.createElement("button", { onClick: onReturnToMenu, className: "w-full p-3 bg-transparent text-gray-600 font-bold rounded-lg hover:bg-gray-100 transition-colors" }, "Quay về menu chính")
      )
    )
  );
};

interface GameProps {
  topic: Topic;
  onReturnToMenu: () => void;
  onNextTopic: () => void;
  onStartPractice: (mistakes: Mistake[]) => void;
}

const Game = ({ topic, onReturnToMenu, onNextTopic, onStartPractice }: GameProps) => {
  const words = useMemo(() => [...topic.words].sort(() => 0.5 - Math.random()), [topic]);
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(1);
  const [wrongAnswers, setWrongAnswers] = useState<Mistake[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [showWrongAnswersModal, setShowWrongAnswersModal] = useState(false);
  const [feedback, setFeedback] = useState<{type: 'correct' | 'incorrect', message: string, example?: string} | null>(null);
  const [gameStage, setGameStage] = useState<'word' | 'sentence1' | 'sentence2'>('word');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const currentWord = words[currentWordIndex];
  const exampleSentences = useMemo(() => currentWord?.englishExample.split(' / ').map(s => s.trim()) || [], [currentWord]);
  const vietnameseExamples = useMemo(() => currentWord?.vietnameseExample.split(' / ').map(s => s.trim()) || [], [currentWord]);

  const speak = useCallback((text: string, onEndCallback: (() => void) | null = null) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      if (onEndCallback && typeof onEndCallback === 'function') {
        utterance.onend = onEndCallback;
      }
      window.speechSynthesis.speak(utterance);
    } else if (onEndCallback && typeof onEndCallback === 'function') {
      onEndCallback();
    }
  }, []);

  const getTextToSpeak = useCallback(() => {
    switch (gameStage) {
      case 'word':
        return currentWord.english;
      case 'sentence1':
        return exampleSentences[0] || '';
      case 'sentence2':
        return exampleSentences[1] || '';
      default:
        return '';
    }
  }, [currentWord, gameStage, exampleSentences]);

  useEffect(() => {
    if (currentWord) {
      const textToSpeak = getTextToSpeak();

      if (textToSpeak) {
        setIsPreviewVisible(true);
        const playSecondTimeAndHide = () => {
          speak(textToSpeak, () => {
            setIsPreviewVisible(false);
            if (inputRef.current) inputRef.current.focus();
          });
        };
        speak(textToSpeak, playSecondTimeAndHide);
      } else {
        setIsPreviewVisible(false);
        if (inputRef.current) inputRef.current.focus();
      }
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentWord, gameStage, speak, getTextToSpeak]);

  useEffect(() => {
      if (feedback) {
          const timer = setTimeout(() => setFeedback(null), 2500);
          return () => clearTimeout(timer);
      }
  }, [feedback]);

  const normalizeSentence = (str: string): string => str ? str.trim().toLowerCase().replace(/[.,!?]/g, '').replace(/[\u2018\u2019']/g, "'") : '';

  const handleNextWord = useCallback(() => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setUserInput('');
      setAttempts(1);
      setShowHint(false);
      setFeedback(null);
      setGameStage('word');
    } else {
      setIsFinished(true);
    }
  }, [currentWordIndex, words.length]);
  
  const handleTransition = useCallback(() => {
    setUserInput('');
    setFeedback(null);
    setAttempts(1);
    setShowHint(false);

    if (gameStage === 'word' && exampleSentences.length > 0 && exampleSentences[0]) {
        setGameStage('sentence1');
    } else if (gameStage === 'sentence1' && exampleSentences.length > 1 && exampleSentences[1]) {
        setGameStage('sentence2');
    } else {
        handleNextWord();
    }
  }, [gameStage, exampleSentences, handleNextWord]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || feedback) return;

    let targetText: string;
    switch(gameStage) {
        case 'word':
            targetText = currentWord.english;
            break;
        case 'sentence1':
            targetText = exampleSentences[0];
            break;
        case 'sentence2':
            targetText = exampleSentences[1];
            break;
    }

    const isCorrect = normalizeSentence(userInput) === normalizeSentence(targetText);

    if (isCorrect) {
        setFeedback({type: 'correct', message: 'Chính xác!', example: gameStage === 'word' ? currentWord.englishExample : undefined});
        if (gameStage === 'word' && attempts === 1) {
          setScore(prev => prev + 1);
        }
        setTimeout(handleTransition, 2500);
    } else {
        setFeedback({type: 'incorrect', message: 'Chưa đúng, thử lại nhé!'});
        if (attempts === 1) {
            setWrongAnswers(prev => {
                const existingMistakeIndex = prev.findIndex(m => m.word.english === currentWord.english);
                if (existingMistakeIndex > -1) {
                    if (gameStage !== 'word') {
                        const updatedMistakes = [...prev];
                        updatedMistakes[existingMistakeIndex].sentenceErrorCount += 1;
                        return updatedMistakes;
                    }
                    return prev;
                } else {
                    return [...prev, { word: currentWord, sentenceErrorCount: gameStage === 'word' ? 0 : 1 }];
                }
            });
        } else if (gameStage !== 'word') {
             setWrongAnswers(prev => {
                const existingMistakeIndex = prev.findIndex(m => m.word.english === currentWord.english);
                if (existingMistakeIndex > -1) {
                    const updatedMistakes = [...prev];
                    updatedMistakes[existingMistakeIndex].sentenceErrorCount += 1;
                    return updatedMistakes;
                }
                 return prev;
            });
        }
        setAttempts(prev => prev + 1);
        if (attempts >= 1) {
          setShowHint(true);
        }
    }
  };

  const handleListenAgain = useCallback(() => {
      const textToSpeak = getTextToSpeak();
      if (textToSpeak) {
          setIsPreviewVisible(true);
          speak(textToSpeak, () => {
              setIsPreviewVisible(false);
              if (inputRef.current) inputRef.current.focus();
          });
      }
  }, [getTextToSpeak, speak]);

  const handlePracticeMistakes = () => {
    if (wrongAnswers.length > 0) {
      setShowWrongAnswersModal(false);
      onStartPractice(wrongAnswers);
    }
  };

  if (isFinished) {
    return React.createElement(GameSummary, { 
      score, 
      total: words.length, 
      onShowWrongAnswers: () => setShowWrongAnswersModal(true), 
      onNextTopic, 
      onReturnToMenu,
      onPracticeMistakes: handlePracticeMistakes,
      mistakesCount: wrongAnswers.length 
    });
  }

  if (!currentWord) {
    return React.createElement("div", { className: "text-center p-8" }, "Đang tải chủ đề...");
  }
  
  const getInputBorderColor = () => {
      if (!feedback) return 'border-gray-300 focus:border-sky-500';
      return feedback.type === 'correct' ? 'border-green-500 animate-pulse' : 'border-red-500 animate-pulse';
  }

  const progressPercentage = ((currentWordIndex) / words.length) * 100;
  
  const getPrompt = () => {
    switch (gameStage) {
        case 'word':
            return React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text-4xl md:text-5xl font-semibold text-gray-900 mb-2" }, currentWord.vietnamese),
            );
        case 'sentence1':
            return React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text-2xl font-semibold text-gray-800 mb-2" }, "Nghe và nhập câu 1:"),
                vietnameseExamples[0] ? React.createElement("p", { className: "text-2xl text-gray-700 mb-2 italic" }, `"${vietnameseExamples[0]}"`) : null,
            );
        case 'sentence2':
            return React.createElement(React.Fragment, null,
                React.createElement("p", { className: "text-2xl font-semibold text-gray-800 mb-2" }, "Nghe và nhập câu 2:"),
                 vietnameseExamples[1] ? React.createElement("p", { className: "text-2xl text-gray-700 mb-2 italic" }, `"${vietnameseExamples[1]}"`) : null,
            );
        default:
            return null;
    }
  };
  
  const getPreview = () => {
      const text = getTextToSpeak();
      const vietnameseText = gameStage === 'word' ? currentWord.vietnamese : (gameStage === 'sentence1' ? vietnameseExamples[0] : vietnameseExamples[1]);
      return React.createElement(React.Fragment, null,
          React.createElement("p", { className: "text-2xl md:text-4xl font-semibold text-sky-700 mb-2 animate-pulse" }, text),
          React.createElement("p", { className: "text-lg text-gray-500" }, `(${vietnameseText})`)
      );
  };

  return React.createElement(
    "div", { className: "flex flex-col items-center justify-center min-h-screen p-4" },
    React.createElement(
      "div", { className: "w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden border border-gray-200" },
      React.createElement("div", { className: "w-full bg-gray-200 rounded-full h-2.5 absolute top-0 left-0" },
        React.createElement("div", { className: "bg-sky-400 h-2.5 rounded-full", style: { width: `${progressPercentage}%`, transition: 'width 0.5s ease-in-out' } })
      ),
      React.createElement("div", { className: "absolute top-4 left-4" },
        React.createElement("button", { onClick: onReturnToMenu, className: "text-gray-500 hover:text-sky-600 transition-colors text-sm" }, "← Đổi chủ đề")
      ),
      React.createElement("div", { className: "absolute top-4 right-4" },
        React.createElement("button", { onClick: () => setShowWrongAnswersModal(true), className: "text-gray-500 hover:text-sky-600 transition-colors text-sm" }, `Lỗi sai (${wrongAnswers.length})`)
      ),
      React.createElement("div", { className: "text-center mt-12" },
        React.createElement("h2", { className: "text-2xl font-bold text-sky-600 mb-2" }, topic.title),
        React.createElement("p", { className: "text-gray-500" }, `Từ ${currentWordIndex + 1} trên ${words.length} • Điểm: ${score}`)
      ),
      React.createElement("div", { className: "my-8 text-center min-h-[160px] flex flex-col justify-center items-center select-none", onContextMenu: (e: React.MouseEvent) => e.preventDefault() },
        isPreviewVisible ? getPreview() : getPrompt(),
        React.createElement("button", { onClick: handleListenAgain, className: "text-gray-500 hover:text-sky-500 transition-colors p-2 rounded-full active:scale-90 transform mt-2" },
          React.createElement(SpeakerIcon)
        )
      ),
      React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
        React.createElement("input", {
          ref: inputRef,
          type: "text",
          value: userInput,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value),
          placeholder: gameStage === 'word' ? "Nhập từ tiếng Anh..." : "Nhập câu tiếng Anh...",
          className: `w-full p-4 text-center text-lg bg-gray-100 border-2 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200 ${getInputBorderColor()}`,
          autoCapitalize: "none",
          autoComplete: "off",
          autoCorrect: "off"
        }),
        React.createElement("button", { type: "submit", className: "w-full p-4 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-transform hover:scale-105 transform duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:scale-100" }, "Nộp bài")
      ),
      React.createElement("div", { className: "mt-4 min-h-[48px] flex items-center justify-center" },
        (showHint && !feedback) ? React.createElement("div", { className: "relative" },
          React.createElement("button", {
            onMouseDown: () => setIsHintVisible(true),
            onMouseUp: () => setIsHintVisible(false),
            onTouchStart: () => setIsHintVisible(true),
            onTouchEnd: () => setIsHintVisible(false),
            className: "px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          }, "Giữ để xem gợi ý"),
          isHintVisible ? React.createElement("div", { className: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white p-3 rounded-lg border border-gray-300 shadow-lg z-10 select-none" },
            React.createElement("p", { className: "text-sky-700 font-mono whitespace-nowrap" }, getTextToSpeak())
          ) : null
        ) : null,
        feedback
          ? React.createElement(
              "div",
              { className: "text-center" },
              React.createElement(
                "p",
                {
                  className: `text-lg font-semibold ${
                    feedback.type === "correct"
                      ? "text-green-500"
                      : "text-red-500"
                  }`,
                },
                feedback.message
              ),
              feedback.example
                ? React.createElement(
                    "p",
                    { className: "text-lg text-gray-500 mt-1 italic" },
                    `VD: "${feedback.example}"`
                  )
                : null
            )
          : null
      )
    ),
    React.createElement(WrongAnswersModal, { 
      isOpen: showWrongAnswersModal, 
      onClose: () => setShowWrongAnswersModal(false), 
      mistakes: wrongAnswers,
      onPracticeMistakes: handlePracticeMistakes 
    })
  );
};

interface WelcomeScreenProps {
    onNameSubmit: (name: string) => void;
}
const WelcomeScreen = ({ onNameSubmit }: WelcomeScreenProps) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onNameSubmit(name.trim());
        }
    };

    return React.createElement(
        "div",
        { className: "flex flex-col items-center justify-center min-h-screen p-4 text-center" },
        React.createElement(
            "div",
            { className: "w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200" },
            React.createElement("h1", { className: "text-4xl font-bold text-sky-600 mb-2" }, "Thử thách từ vựng"),
            React.createElement("p", { className: "text-gray-600 mb-8" }, "Nhập tên của bạn để bắt đầu học!"),
            React.createElement(
                "form",
                { onSubmit: handleSubmit, className: "flex flex-col gap-4" },
                React.createElement("input", {
                    type: "text",
                    value: name,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
                    placeholder: "Tên của bạn",
                    className: "w-full p-4 text-center text-lg bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200",
                    maxLength: 20
                }),
                React.createElement(
                    "button",
                    {
                        type: "submit",
                        disabled: !name.trim(),
                        className: "w-full p-4 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-transform hover:scale-105 transform duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                    },
                    "Bắt đầu học"
                )
            )
        )
    );
};

const topicColors = [
  'bg-rose-100 border-rose-300 hover:bg-rose-200 text-rose-800 focus:ring-rose-500',
  'bg-blue-100 border-blue-300 hover:bg-blue-200 text-blue-800 focus:ring-blue-500',
  'bg-cyan-100 border-cyan-300 hover:bg-cyan-200 text-cyan-800 focus:ring-cyan-500',
  'bg-amber-100 border-amber-300 hover:bg-amber-200 text-amber-800 focus:ring-amber-500',
  'bg-violet-100 border-violet-300 hover:bg-violet-200 text-violet-800 focus:ring-violet-500',
  'bg-fuchsia-100 border-fuchsia-300 hover:bg-fuchsia-200 text-fuchsia-800 focus:ring-fuchsia-500',
  'bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-800 focus:ring-emerald-500',
  'bg-sky-100 border-sky-300 hover:bg-sky-200 text-sky-800 focus:ring-sky-500',
  'bg-lime-100 border-lime-300 hover:bg-lime-200 text-lime-800 focus:ring-lime-500',
  'bg-orange-100 border-orange-300 hover:bg-orange-200 text-orange-800 focus:ring-orange-500',
  'bg-teal-100 border-teal-300 hover:bg-teal-200 text-teal-800 focus:ring-teal-500',
  'bg-indigo-100 border-indigo-300 hover:bg-indigo-200 text-indigo-800 focus:ring-indigo-500',
  'bg-pink-100 border-pink-300 hover:bg-pink-200 text-pink-800 focus:ring-pink-500',
  'bg-yellow-100 border-yellow-300 hover:bg-yellow-200 text-yellow-800 focus:ring-yellow-500',
  'bg-green-100 border-green-300 hover:bg-green-200 text-green-800 focus:ring-green-500',
];

interface TopicSelectorProps {
    playerName: string;
    onSelectTopic: (topic: Topic) => void;
}

const TopicSelector = ({ playerName, onSelectTopic }: TopicSelectorProps) => {
  return React.createElement(
    "div", { className: "flex flex-col items-center min-h-screen p-4" },
    React.createElement(
      "div", { className: "w-full max-w-6xl text-center py-8" },
      React.createElement("h1", { className: "text-3xl md:text-4xl font-bold text-gray-800 mb-2" }, `Chào mừng, ${playerName}!`),
      React.createElement("p", { className: "text-lg text-gray-600 mb-8" }, "Chọn một chủ đề để bắt đầu thử thách của bạn."),
      React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" },
        ...vocabularyData.map((topic, index) =>
          React.createElement(
            "button",
            {
              key: index,
              onClick: () => onSelectTopic(topic),
              className: `p-4 rounded-lg shadow-md border hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75 ${topicColors[index % topicColors.length]}`
            },
            React.createElement("h2", { className: "text-lg font-semibold" }, topic.title),
            React.createElement("p", { className: "mt-1 opacity-80" }, `${topic.words.length} từ`)
          )
        )
      )
    )
  );
};

const App = () => {
  const [playerName, setPlayerName] = useState<string>(() => localStorage.getItem('playerName') || '');
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [topicIndex, setTopicIndex] = useState<number | null>(null);

  const handleNameSubmit = useCallback((name: string) => {
    localStorage.setItem('playerName', name);
    setPlayerName(name);
  }, []);

  const handleSelectTopic = useCallback((topic: Topic) => {
    const index = vocabularyData.findIndex(t => t.title === topic.title);
    setCurrentTopic(topic);
    setTopicIndex(index);
  }, []);
  
  const handleReturnToMenu = useCallback(() => {
      setCurrentTopic(null);
      setTopicIndex(null);
  }, []);

  const handleNextTopic = useCallback(() => {
    if (topicIndex !== null && topicIndex !== -1 && topicIndex < vocabularyData.length - 1) {
        const nextIndex = topicIndex + 1;
        setCurrentTopic(vocabularyData[nextIndex]);
        setTopicIndex(nextIndex);
    } else {
        handleReturnToMenu();
    }
  }, [topicIndex, handleReturnToMenu]);

  const handleStartPractice = useCallback((mistakes: Mistake[]) => {
    if (mistakes.length > 0) {
        const practiceTopic: Topic = {
            title: "Luyện tập lỗi sai",
            words: mistakes.map(mistake => mistake.word)
        };
        setCurrentTopic(practiceTopic);
        setTopicIndex(-1); // Use -1 to denote a practice session
    }
  }, []);

  if (!playerName) {
    return React.createElement(WelcomeScreen, { onNameSubmit: handleNameSubmit });
  }

  if (!currentTopic) {
    return React.createElement(TopicSelector, { playerName, onSelectTopic: handleSelectTopic });
  }

  return React.createElement(Game, { 
      key: currentTopic.title,
      topic: currentTopic, 
      onReturnToMenu: handleReturnToMenu, 
      onNextTopic: handleNextTopic,
      onStartPractice: handleStartPractice
  });
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(App));
