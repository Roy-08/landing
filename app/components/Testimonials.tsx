const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      title: 'Client Testimonial 1',
      videoId: 'LMvgJ7QYkUQ',
    },
    {
      id: 2,
      title: 'Client Testimonial 2',
      videoId: 'f_0WiazKeMI',
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 px-6"
      style={{
        background: 'linear-gradient(180deg, #e8dff5 0%, #fce8d5 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#4a2060] text-center mb-12">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${testimonial.videoId}`}
                  title={testimonial.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="bg-[#4a2060] py-3 px-4">
                <p className="text-white text-sm font-medium text-center">
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;