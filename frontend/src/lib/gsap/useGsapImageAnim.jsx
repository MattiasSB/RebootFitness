import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

export function useGsapImageAnim(selector) {
  const imageRef = useRef();

  useLayoutEffect(() => {

    const refSelector = gsap.utils.selector(imageRef);

    let ctx = gsap.context(() => {
      refSelector(selector).forEach((img) => {
        gsap.fromTo(img, {
          y: '20px',
          opacity: 0,
          visibility: 'hidden',
        }, {
          y: 0,
          opacity: 1,
          visibility: 'visible',
          scrollTrigger: {
            trigger: img,
            start: 'top 70%',
            end: 'bottom bottom',
          },
        });
      });

      return () => {
        ctx.revert();
      };
    });
  });

  return imageRef;
}

