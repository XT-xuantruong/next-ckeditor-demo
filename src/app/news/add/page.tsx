'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Autosave,
  BlockQuote,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Paragraph,
  SpecialCharacters,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  Underline,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const LICENSE_KEY = 'GPL';

export default function AddNewsPage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [mainImageUrl, setMainImageUrl] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setMainImageUrl((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleCreateNews = () => {
    if (!title || !content) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('News created successfully (demo mode)');
    setTitle('');
    setContent('');
    setMainImageUrl([]);
  };

  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = useMemo(() => {
    if (!isLayoutReady) return {};

    return {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'specialCharacters',
          'insertTable',
          'blockQuote',
          '|',
          'outdent',
          'indent',
        ],
      },
      plugins: [
        Autosave,
        BlockQuote,
        Bold,
        Essentials,
        Heading,
        Indent,
        IndentBlock,
        Italic,
        Paragraph,
        SpecialCharacters,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextPartLanguage,
        Underline,
      ],
      heading: {
        options: [
          {
            model: 'paragraph' as const,
            view: 'p',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1' as const,
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2' as const,
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
          {
            model: 'heading3' as const,
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3',
          },
          {
            model: 'heading4' as const,
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4',
          },
          {
            model: 'heading5' as const,
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5',
          },
          {
            model: 'heading6' as const,
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6',
          },
        ],
      },
      licenseKey: LICENSE_KEY,
      placeholder: 'Type or paste your content here!',
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
      },
    };
  }, [isLayoutReady]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-bold">
            <Link href="/news" className="text-blue-600 hover:underline">
              Manage News
            </Link>{' '}
            | Create new news
          </h4>
          <button
            onClick={handleCreateNews}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add News
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* General Information */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-4 rounded">
              <h5 className="font-bold mb-3">General Information</h5>
              <div className="mb-3">
                <label htmlFor="input-name" className="block font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="Title of post"
                  id="input-name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div ref={editorContainerRef}>
                {isLayoutReady && (
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    data={content}
                    onChange={(_, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Upload Images */}
          <div>
            <div className="bg-gray-50 p-4 rounded">
              <h5 className="font-bold mb-3">Upload Images</h5>
              <label
                htmlFor="dropzone-file"
                className="w-full p-4 border-2 border-dashed rounded bg-gray-100 flex flex-col items-center justify-center text-center cursor-pointer"
              >
                <svg
                  className="mb-3"
                  width={24}
                  height={24}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 16"
                >
                  <path
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    stroke="#F5CAAB"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  <strong>Click to upload</strong> or drag and drop
                </p>
                <p className="text-sm text-gray-600">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {mainImageUrl.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${index}`}
                      className="w-24 h-24 object-cover rounded"
                      onClick={() => {
                        setMainImageUrl(mainImageUrl.filter((_, i) => i !== index));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}