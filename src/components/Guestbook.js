/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { colors, spacing, typography, radius, shadows, transitions, gradients } from '../theme';
import { useGetAllGuestbookEntries, saveGuestbookEntry } from '../firebaseServices';
import Spinner from './atoms/Spinner';

const containerCss = css`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${spacing['4xl']} ${spacing.xl};

  @media (max-width: 768px) {
    padding: ${spacing['2xl']} ${spacing.md};
  }
`;

const headerCss = css`
  text-align: center;
  margin-bottom: ${spacing['4xl']};

  h1 {
    font-size: ${typography.fontSize['4xl']};
    font-weight: ${typography.fontWeight.bold};
    background: ${gradients.primary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: ${spacing.md};
  }

  p {
    font-size: ${typography.fontSize.xl};
    color: ${colors.whiteAlpha(0.7)};
  }

  @media (max-width: 768px) {
    h1 {
      font-size: ${typography.fontSize['3xl']};
    }
    p {
      font-size: ${typography.fontSize.lg};
    }
  }
`;

const formContainerCss = css`
  background: ${colors.blackAlpha(0.3)};
  border: 2px solid ${colors.whiteAlpha(0.1)};
  border-radius: ${radius.xl};
  padding: ${spacing['3xl']};
  margin-bottom: ${spacing['4xl']};
  box-shadow: ${shadows.lg};
  transition: ${transitions.normal};

  &:hover {
    border-color: ${colors.whiteAlpha(0.2)};
    box-shadow: ${shadows.xl};
  }

  @media (max-width: 768px) {
    padding: ${spacing.xl};
  }
`;

const formTitleCss = css`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.gold};
  margin-bottom: ${spacing.xl};
`;

const inputCss = css`
  width: 100%;
  padding: ${spacing.md} ${spacing.lg};
  margin-bottom: ${spacing.lg};
  background: ${colors.blackAlpha(0.4)};
  border: 2px solid ${colors.whiteAlpha(0.2)};
  border-radius: ${radius.md};
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-family: ${typography.fontFamily};
  transition: ${transitions.normal};

  &:focus {
    outline: none;
    border-color: ${colors.gold};
    box-shadow: 0 0 20px ${colors.gold}40;
  }

  &::placeholder {
    color: ${colors.whiteAlpha(0.5)};
  }
`;

const textareaCss = css`
  ${inputCss};
  min-height: 120px;
  resize: vertical;
  font-family: ${typography.fontFamily};
`;

const submitButtonCss = css`
  padding: ${spacing.md} ${spacing['3xl']};
  background: ${gradients.primary};
  border: none;
  border-radius: ${radius.lg};
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${transitions.bouncy};

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 0 30px ${colors.gold}60;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const entriesContainerCss = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

const entryCss = css`
  background: ${colors.blackAlpha(0.3)};
  border: 2px solid ${colors.whiteAlpha(0.1)};
  border-radius: ${radius.lg};
  padding: ${spacing.xl};
  transition: ${transitions.normal};

  &:hover {
    border-color: ${colors.whiteAlpha(0.2)};
    transform: translateX(5px);
  }
`;

const entryHeaderCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.md};
  flex-wrap: wrap;
  gap: ${spacing.sm};
`;

const entryNameCss = css`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.gold};
`;

const entryDateCss = css`
  font-size: ${typography.fontSize.sm};
  color: ${colors.whiteAlpha(0.5)};
`;

const entryMessageCss = css`
  color: ${colors.whiteAlpha(0.85)};
  line-height: ${typography.lineHeight.relaxed};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const entryWebsiteCss = css`
  margin-top: ${spacing.md};
  font-size: ${typography.fontSize.sm};

  a {
    color: ${colors.pink};
    text-decoration: none;
    transition: ${transitions.normal};

    &:hover {
      color: ${colors.gold};
      text-decoration: underline;
    }
  }
`;

export default function Guestbook() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { data, error, loading } = useGetAllGuestbookEntries();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      alert('Please provide your name and a message.');
      return;
    }

    setSubmitting(true);
    try {
      await saveGuestbookEntry({
        name: name.trim(),
        message: message.trim(),
        website: website.trim()
      });

      // Clear form
      setName('');
      setMessage('');
      setWebsite('');

      alert('Thank you for signing the guestbook! 🎉\nYour entry will appear when you refresh the page.');
    } catch (error) {
      console.error('Error saving guestbook entry:', error);
      alert('Failed to save your entry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <Spinner centered />;

  return (
    <div css={containerCss}>
      <div css={headerCss}>
        <h1>Guestbook</h1>
        <p>Leave your mark and say hello!</p>
      </div>

      {/* Sign Form */}
      <div css={formContainerCss}>
        <h2 css={formTitleCss}>Sign the Guestbook</h2>
        <form onSubmit={handleSubmit}>
          <input
            css={inputCss}
            type="text"
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            required
          />
          <input
            css={inputCss}
            type="url"
            placeholder="Your Website (optional)"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <textarea
            css={textareaCss}
            placeholder="Your Message *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            required
          />
          <button css={submitButtonCss} type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Sign Guestbook'}
          </button>
        </form>
      </div>

      {/* Entries */}
      <div css={entriesContainerCss}>
        {error && (
          <div style={{ color: colors.red, textAlign: 'center' }}>
            Failed to load guestbook entries.
          </div>
        )}

        {!error && data.length === 0 && (
          <div style={{ color: colors.whiteAlpha(0.6), textAlign: 'center' }}>
            No entries yet. Be the first to sign the guestbook!
          </div>
        )}

        {!error && data.map((entry) => (
          <div key={entry.id} css={entryCss}>
            <div css={entryHeaderCss}>
              <div css={entryNameCss}>{entry.name}</div>
              <div css={entryDateCss}>{formatDate(entry.timestamp)}</div>
            </div>
            <div css={entryMessageCss}>{entry.message}</div>
            {entry.website && (
              <div css={entryWebsiteCss}>
                <a href={entry.website} target="_blank" rel="noopener noreferrer">
                  🔗 {entry.website}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
