const feedbacks = [
  {
    id: 1,
    name: 'Jane Doe',
    role: 'Book Lover, Reader',
    text: 'Great selection, fast delivery, and beautifully packaged books. My go-to store for weekend reads!',
    image: '/Booksy-Group11/img/feedbacks/avatar-w.png',
  },
  {
    id: 2,
    name: 'John Smith',
    role: 'Editor, BookMag',
    text: 'Customer service was super helpful, and my order arrived earlier than expected. Highly recommend!',
    image: '/Booksy-Group11/img/feedbacks/avatar-m.png',
  },
  {
    id: 3,
    name: 'Emily Johnson',
    role: 'Author, Novelist',
    text: 'Love the curated picks and clear descriptions. Makes it easy to find my next favorite book.',
    image: '/Booksy-Group11/img/feedbacks/avatar.png',
  },
  {
    id: 4,
    name: 'Lucas Bennett',
    role: 'Literature Student',
    text: 'The reviews help me pick the right book every time. Love how easy the layout is!',
    image: '/Booksy-Group11/img/feedbacks/avatar-m.png',
  },
  {
    id: 5,
    name: 'Sophie Miller',
    role: 'Freelance Writer',
    text: 'Beautifully designed website and smooth checkout. The book summaries are spot-on!',
    image: '/Booksy-Group11/img/feedbacks/avatar-w.png',
  },
  {
    id: 6,
    name: 'Daniel Kim',
    role: 'Book Reviewer',
    text: 'Fast delivery and excellent packaging. I’ve already recommended this store to my friends.',
    image: '/Booksy-Group11/img/feedbacks/avatar-m.png',
  },
  {
    id: 7,
    name: 'Amelia Torres',
    role: 'Content Creator',
    text: 'The reading recommendations are always fresh and inspiring. Great job, team!',
    image: '/Booksy-Group11/img/feedbacks/avatar.png',
  },
  {
    id: 8,
    name: 'Oliver Wright',
    role: 'Teacher, Literature Enthusiast',
    text: 'I appreciate the curated collections. Makes finding classroom material a breeze!',
    image: '/Booksy-Group11/img/feedbacks/avatar-m.png',
  },
  {
    id: 9,
    name: 'Hannah Brooks',
    role: 'Book Club Organizer',
    text: 'I can always find niche titles here that I can’t get anywhere else. Fantastic service!',
    image: '/Booksy-Group11/img/feedbacks/avatar.png',
  },
  {
    id: 10,
    name: 'Ethan Clark',
    role: 'Graphic Designer',
    text: 'Love the typography and layout of the reviews section — clean and inviting!',
    image: '/Booksy-Group11/img/feedbacks/avatar-m.png',
  },
  {
    id: 11,
    name: 'Natalie Rivers',
    role: 'Book Blogger',
    text: 'I can always find niche titles here that I can’t get anywhere else. Fantastic service!',
    image: '/Booksy-Group11/img/feedbacks/avatar-w.png',
  },
  {
    id: 12,
    name: 'Michael Lee',
    role: 'Collector of Classics',
    text: 'The rare editions section is a treasure trove. Thank you for keeping print culture alive!',
    image: '/Booksy-Group11/img/feedbacks/avatar-m.png',
  },
];

const feedbackList = feedbacks
  .map(
    fb =>
      `<li class="swiper-slide feedback-item">
        <p class ="feedback-text-item">${fb.text}</p>
        <div class="user-container">
        <img class="swiper-slide image-avatar" src="${fb.image}" alt="${fb.name}"/>
        <div class="user-info">
        <p class="user-name">${fb.name}</p>
        <p class="user-role">${fb.role}</p>
        </div>
        </div>
    </li>`
  )
  .join('');

const feedbacksContainer = document.querySelector('.feedback-list');
feedbacksContainer.innerHTML = feedbackList;
