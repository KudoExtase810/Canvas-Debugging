import ImageUploader from "@/components/images/retouch/ImageUploader";

const Retouch = () => {
    return (
        <div className="container mx-auto">
            <section className="section-padding max-w-screen-lg mx-auto">
                <div className="text-center pb-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold pb-4">
                        Retouch photo online
                    </h1>
                    <p className="text-default-500 sm:text-lg">
                        Magically remove unwanted elements & retouch images
                        instantly
                    </p>
                </div>
                <ImageUploader />
            </section>
        </div>
    );
};

export default Retouch;
