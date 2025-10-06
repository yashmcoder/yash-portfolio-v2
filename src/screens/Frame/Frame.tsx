import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const MangaBackground = () => (
  <div className="fixed inset-0 z-0 opacity-30">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
    <div className="absolute inset-0" style={{
      backgroundImage: `url('/one-piece-1.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'grayscale(100%) contrast(1.2)'
    }} />
  </div>
);

const LoadingScreen = () => (
  <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
    <div className="relative">
      {/* Main anime-style loading animation */}
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 border-4 border-yellow-400/30 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Inner pulsing circle */}
        <div className="absolute w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping opacity-75"></div>
        
        {/* Center lightning bolt */}
        <div className="absolute text-yellow-400 text-3xl animate-pulse">
          ⚡
        </div>
      </div>
      
      {/* Sparkle effects */}
      <div className="absolute -top-8 -left-8 text-yellow-300 text-xl animate-ping">✨</div>
      <div className="absolute -top-4 -right-10 text-yellow-200 text-lg animate-pulse">⭐</div>
      <div className="absolute -bottom-8 -left-10 text-yellow-300 text-xl animate-bounce">⚡</div>
      <div className="absolute -bottom-4 -right-8 text-yellow-200 text-lg animate-ping">✨</div>
      
      {/* Loading text */}
      <div className="mt-12 text-center">
        <p className="[font-family:'Silkscreen',Helvetica] font-normal text-white text-xl animate-pulse">
          Loading Assets...
        </p>
        <p className="[font-family:'Share_Tech',Helvetica] font-normal text-yellow-400/70 text-sm mt-2 animate-pulse">
          Preparing your experience
        </p>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="w-full bg-black text-white py-8">
    <div className="text-center">
      <p className="[font-family:'Share_Tech',Helvetica] font-normal text-sm tracking-[0] leading-[normal]">
        © 2025 Yash Malav - All rights reserved.
      </p>
      <p className="[font-family:'Share_Tech',Helvetica] font-normal text-xs tracking-[0] leading-[normal] mt-2 opacity-75">
        Designed and developed by Yash Malav
      </p>
    </div>
  </footer>
);

const ImageModal = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
    <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="w-auto h-auto max-w-full max-h-full object-contain"
        style={{ maxWidth: '95vw', maxHeight: '95vh' }}
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 bg-black bg-opacity-70 text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all text-xl font-bold"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  </div>
);

const socialIcons = [
  {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg",
    alt: "Instagram",
    left: "left-[152px]",
  },
  {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg",
    alt: "X",
    left: "left-[280px]",
  },
  {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg",
    alt: "LinkedIn",
    left: "left-[408px]",
  },
  {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg",
    alt: "Discord",
    left: "left-[536px]",
  },
];

const portfolioImages = [
  {
    top: "top-[851px]",
    left: "left-[calc(50.00%_-_216px)]",
    width: "w-[432px]",
    height: "h-[259px]",
    src: "/flames2-1.png",
    alt: "Flames",
  },
  {
    top: "top-[1074px]",
    left: "left-[303px]",
    width: "w-[213px]",
    height: "h-[302px]",
    src: "/a-3d-png-1.png",
    alt: "A png",
  },
  {
    top: "top-[1115px]",
    left: "left-[424px]",
    width: "w-[432px]",
    height: "h-[259px]",
    src: "/1-2.png",
    alt: "Element",
  },
  {
    top: "top-[1379px]",
    left: "left-[424px]",
    width: "w-[214px]",
    height: "h-[302px]",
    src: "/b-vector-1.png",
    alt: "B vector",
  },
  {
    top: "top-[1381px]",
    left: "left-[84px]",
    width: "w-[268px]",
    height: "h-[151px]",
    src: "/websitebanner-1.png",
    alt: "Websitebanner",
  },
  {
    top: "top-[1381px]",
    left: "left-[357px]",
    width: "w-[159px]",
    height: "h-[151px]",
    src: "/3-2.png",
    alt: "Element",
  },
  {
    top: "top-[1842px]",
    left: "left-[424px]",
    width: "w-[432px]",
    height: "h-[62px]",
    src: "/youtube-banener-2-1.png",
    alt: "Youtube banener",
  },
];

export const Frame = (): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAssets = async () => {
      const imagePromises = [
        // Profile image
        '/download--1--1.png',
        // Background images
        '/one-piece-1.png',
        // Portfolio images
        '/flames2-1.png',
        '/a-3d-png-1.png', 
        '/1-2.png',
        '/3-2.png',
        '/websitebanner-1.png',
        '/b-vector-1.png',
        '/image.png',
        '/images-1.png',
        '/untitled-design-1.png',
        '/youtube-banener-2-1.png',
        // Social icons (external, but we'll wait a bit for them)
      ].map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails
          img.src = src;
        });
      });

      // Wait for fonts to load
      const fontPromises = [
        document.fonts.load("16px 'Silkscreen'"),
        document.fonts.load("16px 'Share_Tech'"),
        document.fonts.load("16px 'Inknut_Antiqua'"),
      ];

      try {
        await Promise.all([...imagePromises, ...fontPromises]);
        // Add a small delay to ensure smooth transition
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        // If loading fails, still show the content after a timeout
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    loadAssets();
  }, []);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="bg-black w-full min-h-screen relative overflow-x-hidden flex flex-col">
        <MangaBackground />
      <div className="flex-grow relative z-10">
        <div className="max-w-[650px] mx-auto px-4 py-8 relative">
          <Card className="absolute left-1/2 transform -translate-x-1/2 top-4 z-20 w-full max-w-[280px] bg-[#131313]/80 backdrop-blur-sm rounded-[26px] overflow-hidden border border-white/20 shadow-[0px_-20px_40px_-10px_rgba(255,255,255,0.1)]">
            <CardContent className="p-0 relative aspect-square">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                alt="Profile"
                src="/download--1--1.png"
              />

              <div className="absolute bottom-0 right-0 px-4 py-3 bg-black/80 backdrop-blur-sm rounded-tl-[26px] border-t border-l border-white/30 shadow-[-2px_-2px_10px_-2px_rgba(255,255,255,0.1)]">
                <address className="[font-family:'Share_Tech',Helvetica] font-normal text-white text-sm md:text-base tracking-[0] leading-[normal] whitespace-nowrap not-italic">
                  mail: hi@yashm.me
                </address>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full mt-32 bg-[#131313]/90 backdrop-blur-md rounded-[26px] overflow-hidden border border-white/10 shadow-[0px_0px_60px_-5px_rgba(255,255,255,0.05)]">
            <CardContent className="p-0 pt-40">
              <div className="p-8 md:p-12">
              <header className="flex flex-col items-center gap-3.5 mb-8">
                <h1 className="[font-family:'Silkscreen',Helvetica] font-normal text-white text-4xl md:text-5xl lg:text-[64px] tracking-[0] leading-tight text-center">
                  Yash Malav
                </h1>

                <p className="[font-family:'Silkscreen',Helvetica] font-normal text-[#f3ebcf] text-lg md:text-xl tracking-[0] leading-normal text-center">
                  Graphic Designer &amp; Visual Thinker
                </p>
              </header>

              <div className="bg-white/10 backdrop-blur-sm rounded-[23px] p-6 mb-8 border border-white/20 shadow-[inset_0px_0px_30px_2px_rgba(255,255,255,0.05)]">
                <p className="[font-family:'Inknut_Antiqua',Helvetica] font-normal text-white text-lg md:text-xl text-center tracking-[0] leading-relaxed">
                  I design Visuals that make <br />
                  Ideas impossible to Ignore.
                </p>
              </div>

              <nav className="flex items-center justify-center gap-4 mb-8">
                {socialIcons.map((icon, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <div className="w-8 md:w-12 h-px bg-white/30" />
                    )}
                    <button
                      className="w-10 h-10 flex items-center justify-center bg-transparent backdrop-blur-sm rounded-full overflow-hidden cursor-pointer hover:bg-white/10 hover:scale-105 transition-all duration-300 border border-white/20"
                      aria-label={icon.alt}
                      onClick={
                        index === 0 ? () => window.open('https://www.instagram.com/yash.svg', '_blank') :
                        index === 1 ? () => window.open('https://x.com/iam_YashM?t=rWvCkGERs3jdg9f-BhF2kQ&s=08', '_blank') :
                        index === 2 ? () => window.open('https://www.linkedin.com/in/yash-malav-709512141/', '_blank') :
                        index === 3 ? () => window.open('https://discord.com/users/673743515267760168', '_blank') :
                        undefined
                      }
                    >
                      <img
                        className="w-6 h-6 object-contain invert"
                        alt={icon.alt}
                        src={icon.src}
                      />
                    </button>
                  </React.Fragment>
                ))}
              </nav>

              <div className="flex flex-col items-center gap-4 mb-8">
                <Button
                  className="w-full max-w-[236px] h-[33px] bg-[#ffa9a9] rounded-md border border-white/20 hover:bg-[#ffa9a9] !hover:bg-[#ffa9a9] hover:scale-105 transition-all duration-300"
                  onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=hi@yashm.me', '_blank')}
                >
                  <span className="[font-family:'Gajraj_One',Helvetica] font-normal text-[#580707] text-base tracking-[0] leading-normal whitespace-nowrap">
                    Contact Me
                  </span>
                </Button>

                <Button
                  className="w-full max-w-[236px] h-[33px] bg-[#a6ff6f] rounded-md border border-white/20 hover:bg-[#a6ff6f] !hover:bg-[#a6ff6f] hover:scale-105 transition-all duration-300"
                  onClick={scrollToProjects}
                >
                  <span className="[font-family:'Gajraj_One',Helvetica] font-normal text-[#265807] text-base tracking-[0] leading-normal">
                    View Projects
                  </span>
                  <img
                    className="ml-2 w-[15px] h-4"
                    alt="Arrow"
                    src="/arrow-2.svg"
                  />
                </Button>
              </div>
            </div>

            <section ref={projectsRef} className="grid grid-cols-1 gap-3 p-3 bg-black">
              <div className="w-full aspect-[16/9] overflow-hidden rounded-lg border border-white/20">
                <div className="w-full h-full relative backdrop-blur-sm" style={{ backgroundImage: 'url(/flames2-1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                  <img
                    className="relative z-10 w-full h-full object-cover cursor-pointer hover:scale-105 hover:opacity-90 transition-all duration-300"
                    alt="Flames"
                    src="/flames2-1.png"
                    onClick={() => setSelectedImage({ src: "/flames2-1.png", alt: "Flames" })}
                  />
                </div>
              </div>

              <div className="w-full aspect-[16/9] overflow-hidden rounded-lg border border-white/20">
                <div className="w-full h-full relative backdrop-blur-sm" style={{ backgroundImage: 'url(/1-2.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                  <img
                    className="relative z-10 w-full h-full object-cover cursor-pointer hover:scale-105 hover:opacity-90 transition-all duration-300"
                    alt="Element"
                    src="/1-2.png"
                    onClick={() => setSelectedImage({ src: "/1-2.png", alt: "Element" })}
                  />
                </div>
              </div>              <div className="grid grid-cols-2 gap-3">
                <div className="w-full aspect-[3/4] overflow-hidden rounded-lg border border-white/20">
                  <div className="w-full h-full relative backdrop-blur-sm" style={{ backgroundImage: 'url(/a-3d-png-1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                    <img
                      className="relative z-10 w-full h-full object-contain cursor-pointer hover:scale-105 hover:opacity-90 transition-all duration-300"
                      alt="A png"
                      src="/a-3d-png-1.png"
                      onClick={() => setSelectedImage({ src: "/a-3d-png-1.png", alt: "A png" })}
                    />
                  </div>
                </div>
                <div className="w-full aspect-[3/4] overflow-hidden rounded-lg border border-white/20">
                  <div className="w-full h-full relative backdrop-blur-sm" style={{ backgroundImage: 'url(/b-vector-1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                    <img
                      className="relative z-10 w-full h-full object-contain cursor-pointer hover:scale-105 hover:opacity-90 transition-all duration-300"
                      alt="B vector"
                      src="/b-vector-1.png"
                      onClick={() => setSelectedImage({ src: "/b-vector-1.png", alt: "B vector" })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="w-full aspect-video overflow-hidden rounded-lg border border-white/20">
                  <div className="w-full h-full relative backdrop-blur-sm" style={{ backgroundImage: 'url(/websitebanner-1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                    <img
                      className="relative z-10 w-full h-full object-cover cursor-pointer hover:scale-105 hover:opacity-90 transition-all duration-300"
                      alt="Websitebanner"
                      src="/websitebanner-1.png"
                      onClick={() => setSelectedImage({ src: "/websitebanner-1.png", alt: "Websitebanner" })}
                    />
                  </div>
                </div>
                <div className="w-full aspect-video overflow-hidden rounded-lg border border-white/20">
                  <div className="w-full h-full relative backdrop-blur-sm" style={{ backgroundImage: 'url(/3-2.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                    <img
                      className="relative z-10 w-full h-full object-cover cursor-pointer hover:scale-105 hover:opacity-90 transition-all duration-300"
                      alt="Element"
                      src="/3-2.png"
                      onClick={() => setSelectedImage({ src: "/3-2.png", alt: "Element" })}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full aspect-[16/4] overflow-hidden rounded-lg border border-white/20">
                <div className="w-full h-full relative backdrop-blur-sm" style={{ backgroundImage: 'url(/youtube-banener-2-1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                  <img
                    className="relative z-10 w-full h-full object-cover cursor-pointer hover:scale-105 hover:opacity-90 transition-all duration-300"
                    alt="Youtube banner"
                    src="/youtube-banener-2-1.png"
                    onClick={() => setSelectedImage({ src: "/youtube-banener-2-1.png", alt: "Youtube banner" })}
                  />
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
        </div>
      </div>
      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <Footer />
    </div>
    </>
  );
};
