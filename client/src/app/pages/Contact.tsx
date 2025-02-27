import Head from "../components/Head";

const Contact = () => {
  return (
    <>
     <Head title="Contact" />
      <main className="pt-90">
        <div className="mb-4 pb-4"></div>
        <section className="contact-us container">
          <div className="mw-930">
            <h2 className="page-title">CONTACT US</h2>
          </div>
        </section>

        <hr className="mt-2 text-secondary " />
        <div className="mb-4 pb-4"></div>

        <section className="contact-us container">
          <div className="mw-930">
            <div className="contact-us__form">
              <form
                name="contact-us-form"
                className="needs-validation"
                method="POST"
              >
                <h3 className="mb-5">Get In Touch</h3>
                <div className="form-floating my-4">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name *"
                    required
                  />
                  <label htmlFor="contact_us_name">Name *</label>
                  <span className="text-danger"></span>
                </div>
                <div className="form-floating my-4">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Phone *"
                    required
                  />
                  <label htmlFor="contact_us_name">Phone *</label>
                  <span className="text-danger"></span>
                </div>
                <div className="form-floating my-4">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email address *"
                    required
                  />
                  <label htmlFor="contact_us_name">Email address *</label>
                  <span className="text-danger"></span>
                </div>
                <div className="my-4">
                  <textarea
                    className="form-control form-control_gray"
                    name="comment"
                    placeholder="Your Message"
                    cols={30}
                    rows={8}
                    required
                  ></textarea>
                  <span className="text-danger"></span>
                </div>
                <div className="my-4">
                  <button type="submit" className="btn btn-primary bg-black">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};


export default Contact;