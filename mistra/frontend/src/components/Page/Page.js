import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography } from 'antd';
import './Page.css';

import ButtonToTop from "./ButtonToTop";

const { Title } = Typography;

function Page({ slug }) {
  const { slug: paramSlug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentSlug = slug || paramSlug;

    axios.get(`http://localhost:1337/api/pages?filters[slug][$eq]=${currentSlug}`)
      .then(({ data }) => {
        setPage(data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the page!', error);
        setError(error);
        setLoading(false);
      });
  }, [slug, paramSlug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>There was an error loading the page.</div>;
  if (!page) return <div>Page not found.</div>;

  return (
    <div>
      <div className='page-content'>
        <Title>{page.attributes.title}</Title>
      </div>
      <div
        className="page-html-content"
        dangerouslySetInnerHTML={{ __html: page.attributes.content }}
      />
      <ButtonToTop />
    </div>
  );
}

export default Page;
