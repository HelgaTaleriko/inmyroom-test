import React, {useEffect, useState} from 'react';
import './TapBar.css';
import {ShareIcon} from "./icons/ShareIcon";
import {PageUpIcon} from "./icons/PageUpIcon";
import {CommentsIcon} from "./icons/CommentsIcon";
import {FavoriteIcon} from "./icons/FavoriteIcon";

export const TapBar = () => {

    const [commentsCount, setCommentsCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;
            if (currentScrollPosition > 200 && currentScrollPosition > lastScrollPosition) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            setLastScrollPosition(currentScrollPosition);
        };

        const handleScrollEnd = () => {
            setTimeout(() => {
                setIsHidden(false);
            }, 1000);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScrollEnd);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScrollEnd);
        };
    }, [lastScrollPosition]);
    const handleBackToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleShare = () => {
        //   TODO:  проверить на телефоне

        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href
            })
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            const el = document.createElement('textarea');
            el.value = window.location.href;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            console.log('Link copied to clipboard:', window.location.href);
        }
    };

    const handleComments = () => {
        setCommentsCount(commentsCount + 1);
    };

    const handleFavorite = () => {
        setFavoriteCount(favoriteCount + 1)
    };

    return (
        <div className={`tapbar ${isHidden ? 'hidden' : ''}`}>
            <button onClick={handleShare}>
                <ShareIcon/>
            </button>
            <button onClick={handleBackToTop}>
                <PageUpIcon/>
            </button>
            <button onClick={handleComments}>
                <CommentsIcon/>
                <span>{commentsCount}</span>
            </button>
            <button onClick={handleFavorite}>
                <FavoriteIcon/>
                <span>{favoriteCount}</span>
            </button>
        </div>
    );

}


