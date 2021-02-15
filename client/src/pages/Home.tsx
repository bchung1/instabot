import React, { ReactElement } from 'react'

import Hero from '../components/Hero';

export default function Home(): ReactElement {
    return (
        <div>
            <Hero
                title="Social Media Giveaways Automated."
                subtitle="We manage your social media giveaways, so you can focus on your audience."
            />
        </div>
    )
}