import { useState } from 'react';
import { ChevronDown, ChevronUp, ThumbsUp, MessageSquare } from 'lucide-react';

export default function VideoPage() {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, text: 'Great video!', likes: 5, replies: [] },
    { id: 2, text: 'Loved the content, keep it up!', likes: 2, replies: [] },
  ]);

  const toggleExpand = () => setExpanded(!expanded);

  const addLike = (id) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)),
    );
  };

  const addReply = (id, replyText) => {
    setComments(
      comments.map((c) =>
        c.id === id
          ? { ...c, replies: [...c.replies, { text: replyText }] }
          : c,
      ),
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <p className={expanded ? '' : 'line-clamp-3'}>
          This is a sample description for the video. It contains information
          about the content and other relevant details that viewers might find
          useful.
        </p>
        <button
          className="text-blue-500 flex items-center mt-2"
          onClick={toggleExpand}
        >
          {expanded ? 'Show Less' : 'Show More'}
          {expanded ? (
            <ChevronUp className="ml-1" size={16} />
          ) : (
            <ChevronDown className="ml-1" size={16} />
          )}
        </button>
      </div>

      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="border-b py-2">
            <p>{comment.text}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <button
                className="flex items-center hover:text-blue-500"
                onClick={() => addLike(comment.id)}
              >
                <ThumbsUp size={16} className="mr-1" /> {comment.likes}
              </button>
              <button
                className="flex items-center hover:text-blue-500"
                onClick={() => addReply(comment.id, 'Nice reply!')}
              >
                <MessageSquare size={16} className="mr-1" /> Reply
              </button>
            </div>
            {comment.replies.length > 0 && (
              <div className="ml-4 mt-2 text-gray-700 text-sm">
                {comment.replies.map((reply, index) => (
                  <p key={index} className="border-l pl-2 my-1">
                    {reply.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
