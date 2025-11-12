import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FaAward, FaUsers, FaHome, FaHandshake } from 'react-icons/fa';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - OnDrive Realty</title>
        <meta name="description" content="Learn about OnDrive Realty and our mission to help you find your dream home" />
      </Head>

      <Layout>
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">About OnDrive Realty</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Your trusted partner in Northwest real estate for over 20 years
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              At OnDrive Realty, we're committed to making your real estate journey as smooth and successful as possible. 
              We leverage cutting-edge technology, including real-time NWMLS integration, to provide you with the most 
              up-to-date property listings and market insights. Our team of experienced agents is dedicated to understanding 
              your unique needs and helping you find the perfect home or investment property.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">20+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">5,000+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-gray-600">Expert Agents</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">$2B+</div>
                <div className="text-gray-600">Properties Sold</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                  <FaAward className="text-4xl text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every transaction and interaction.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                  <FaUsers className="text-4xl text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Client-Focused</h3>
                <p className="text-gray-600">
                  Your needs and goals are at the center of everything we do.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                  <FaHandshake className="text-4xl text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Integrity</h3>
                <p className="text-gray-600">
                  Honesty and transparency guide all our business practices.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                  <FaHome className="text-4xl text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-gray-600">
                  We're committed to strengthening the communities we serve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                Founded in 2003, OnDrive Realty began with a simple mission: to revolutionize the real estate 
                experience in the Pacific Northwest. What started as a small team of passionate real estate 
                professionals has grown into one of the region's most trusted and innovative brokerages.
              </p>
              <p className="text-lg leading-relaxed">
                We were among the first in the region to fully integrate with the NWMLS system, providing our 
                clients with instant access to the most comprehensive and up-to-date property listings. This 
                commitment to technology and innovation, combined with our dedication to personalized service, 
                has helped thousands of families find their dream homes.
              </p>
              <p className="text-lg leading-relaxed">
                Today, our team of over 50 expert agents serves clients throughout Washington State, 
                specializing in residential, commercial, and investment properties. We're proud to be a 
                part of the communities we serve and look forward to helping you with your real estate needs.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
            <p className="text-xl mb-8">
              Meet our team of expert agents who are ready to help you.
            </p>
            <Link
              href="/agents"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Meet Our Agents
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
