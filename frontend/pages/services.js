import Head from 'next/head';
import Layout from '../components/Layout';
import { FaHome, FaDollarSign, FaKey, FaFileContract, FaChartLine, FaHandshake } from 'react-icons/fa';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      icon: FaHome,
      title: 'Home Buying Assistance',
      description: 'Navigate the buying process with expert guidance. We help you find the perfect property, negotiate the best price, and handle all paperwork.',
      features: [
        'Property search and matching',
        'Market analysis and pricing guidance',
        'Negotiation support',
        'Closing coordination'
      ]
    },
    {
      icon: FaDollarSign,
      title: 'Home Selling Services',
      description: 'Maximize your home\'s value with our comprehensive selling services. From staging to closing, we\'re with you every step.',
      features: [
        'Professional property valuation',
        'Marketing and listing optimization',
        'Staging consultation',
        'Buyer screening and negotiations'
      ]
    },
    {
      icon: FaKey,
      title: 'Property Rental',
      description: 'Whether you\'re looking to rent or lease your property, we connect landlords and tenants efficiently.',
      features: [
        'Tenant screening',
        'Lease agreement preparation',
        'Property management support',
        'Rental market analysis'
      ]
    },
    {
      icon: FaChartLine,
      title: 'Home Valuation',
      description: 'Get an accurate, data-driven valuation of your property using the latest market data and comparable sales.',
      features: [
        'Comprehensive market analysis',
        'Comparative property assessment',
        'Detailed valuation report',
        'Investment potential analysis'
      ]
    },
    {
      icon: FaFileContract,
      title: 'Legal & Documentation',
      description: 'Our team ensures all legal aspects of your transaction are handled professionally and efficiently.',
      features: [
        'Contract review and preparation',
        'Title and escrow coordination',
        'Disclosure documentation',
        'Closing support'
      ]
    },
    {
      icon: FaHandshake,
      title: 'Consultation Services',
      description: 'Expert advice tailored to your real estate needs, whether you\'re buying, selling, or investing.',
      features: [
        'Market trend analysis',
        'Investment strategy planning',
        'Portfolio diversification advice',
        'Long-term planning support'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Our Services - OnDrive Realty</title>
        <meta name="description" content="Comprehensive real estate services including buying, selling, and property management" />
      </Head>

      <Layout>
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
                    <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                      <Icon className="text-4xl text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <span className="text-primary-600 mr-2 mt-1">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Consultation</h3>
                <p className="text-gray-600">
                  We start by understanding your needs, goals, and budget.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Search & Match</h3>
                <p className="text-gray-600">
                  We find properties that perfectly match your criteria.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Negotiate</h3>
                <p className="text-gray-600">
                  Our experts negotiate the best terms for your transaction.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-xl font-bold mb-2">Close</h3>
                <p className="text-gray-600">
                  We guide you through closing and hand you the keys.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Contact us today to discuss your real estate needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Contact Us
              </Link>
              <Link
                href="/listings"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
              >
                Browse Listings
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
