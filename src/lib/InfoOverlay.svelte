<script lang="ts">
  import { infoOverlayVisible } from '../stores';
  import CloseButton from './CloseButton.svelte';

  let root: HTMLDivElement;
  let active_tab = localStorage.getItem('active_tab')
    ? Number(localStorage.getItem('active_tab'))
    : 1;
  function closeInfoOverlay() {
    infoOverlayVisible.update(() => false);
    localStorage.removeItem('active_tab');
  }

  function showTabState(parameter: number) {
    active_tab = parameter;
    root.scrollTop = 0;
  }
</script>

<aside class="overlay overlay--info" bind:this={root}>
  <CloseButton functionOnClick={closeInfoOverlay}
    >close info overlay</CloseButton
  >

  <div class="header__menu__margin">
    <div class="info__tabs first__row">
      <button class:active={active_tab == 1} on:click={() => showTabState(1)}
        >About
      </button>
      <button
        class:active={active_tab == 2}
        style="border-right: 1px solid black;"
        on:click={() => showTabState(2)}
        >Support Us
      </button>
    </div>
    <div class="info__tabs">
      <button class:active={active_tab == 3} on:click={() => showTabState(3)}
        >Moderation
      </button>
      <button
        class:active={active_tab == 4}
        style="border-right: 1px solid black;"
        on:click={() => showTabState(4)}
        >Press
      </button>
    </div>
  </div>
  <CloseButton functionOnClick={closeInfoOverlay}
    >close info overlay</CloseButton
  >
  <div class="overlay__outer">
    <div class="overlay__content">
      <section style={active_tab !== 1 ? 'display: none;' : ''}>
        <h2 style="border-top: 0px;">About</h2>
        <div class="overlay__section-text">
          <p>
            People's River Stories is a community-driven interactive map for
            sharing memories, reflections, and oral histories connected to
            rivers across America and beyond. It is a participatory subproject
            of <em>A Secret History of American River People</em>, an effort
            underway since 2014 to document and amplify river life, culture, and
            memory.
          </p>

          <p>
            The platform provides a space for individuals and communities to
            record their stories—of labor and livelihood, environmental change,
            joy, displacement, resilience, and deep connection to place—woven
            through the rivers that shape their lives. From generational
            histories to fleeting moments of beauty, People's River Stories
            serves as a living archive of life along the waterways.
          </p>

          <p>
            Rooted in the principles of participatory storytelling, the project
            invites voices often overlooked by official histories— centering
            working people, Indigenous communities, migrants, and local stewards
            of the river landscape. Through mapping experiences across geography
            and time, the project aims to reveal the profound ways rivers carry
            not just water, but memory, resistance, and adaptation.
          </p>

          <h2>Land Acknowledgment</h2>
          <div class="overlay__section-text">
            <p>
              People's River Stories acknowledges that the rivers and lands we
              document and traverse are Indigenous lands, shaped and cared for
              by Native peoples long before European settlement. These waterways
              remain deeply connected to Indigenous history, life, and
              sovereignty.
            </p>

            <p>
              As we gather and share river stories, it is essential to recognize
              how processes of colonization, displacement, and environmental
              destruction continue to impact these lands and communities.
              Reflection on the intersections of land, water, race, class, and
              belonging is vital to any honest engagement with river memory.
            </p>

            <p>
              If you are not currently aware of the Indigenous peoples connected
              to the land where you live, you can learn more at
              <a
                href="https://www.native-land.ca/"
                target="_blank"
                rel="noopener">native-land.ca</a
              >. We encourage contributors and visitors alike to move beyond
              acknowledgment, and to seek out ways to materially support
              Indigenous sovereignty and environmental justice efforts.
            </p>
          </div>
        </div>
      </section>

      <section style={active_tab !== 2 ? 'display: none;' : ''}>
        <h2>Support</h2>
        <div class="overlay__section-text">
          <p>
            People's River Stories is a grassroots participatory project and
            relies on community support to keep the platform growing. If you'd
            like to contribute to the project, you can learn more at
            <a
              href="https://peoplesriverhistory.org/support/"
              target="_blank"
              rel="noopener">our support page</a
            >.
          </p>
          <div class="button__fadein">
            <a
              href="https://peoplesriverhistory.org/support/"
              class="donate_button"
              target="_blank"
              rel="noopener">SUPPORT</a
            >
          </div>
        </div>

        <h2>Volunteer</h2>
        <div class="overlay__section-text">
          <p>
            While our core moderation team is small and the volume of
            submissions is modest, we welcome inquiries from those interested in
            helping. If you would like to volunteer your time, please reach out
            to us at
            <a href="mailto:info@peoplesriverhistory.org"
              >info@peoplesriverhistory.org</a
            >.
          </p>
        </div>
      </section>

      <section style={active_tab !== 3 ? 'display: none;' : ''}>
        <h2>Moderation Guidelines</h2>
        <div class="overlay__section-text">
          <p>
            Posts to People's River Stories are reviewed by a small group of
            moderators before appearing publicly. This is to ensure the
            following types of content are not posted:
          </p>

          <div class="partial_div-numbered">
            <span>1</span>
            <p>
              Breaches of Privacy <br />
              Stories about families, ancestors, and local histories are welcome,
              including names where appropriate. However, please avoid including
              private contact information such as phone numbers, email addresses,
              social media handles, or exact home addresses.
            </p>
          </div>

          <div class="partial_div-numbered">
            <span>2</span>
            <p>
              Hate Speech <br />
              We do not approve posts that degrade, threaten, or incite hatred against
              any group based on race, ethnicity, citizenship, ability, sexuality,
              sex, gender, or class. Stories that document experiences of racism,
              sexism, or other injustice are welcome when shared respectfully and
              reflectively.
            </p>
          </div>

          <div class="partial_div-numbered">
            <span>3</span>
            <p>
              Spam/Advertising <br />
              We do not approve spam posts or advertisements of any kind.
            </p>
          </div>

          <p style="margin-top: 0px;">
            Our moderation process is designed to maintain the safety, respect,
            and integrity of the map, while allowing for honest, sometimes
            difficult, storytelling.
          </p>
        </div>

        <h2>Request Removal</h2>
        <div class="overlay__section-text removal_textarea">
          <p>
            If you would like a story you posted to be removed, or see something
            you feel should not be on the map, please contact us at
            <a href="mailto:info@peoplesriverhistory.org"
              >info@peoplesriverhistory.org</a
            >.
          </p>
        </div>
      </section>

      <section style={active_tab !== 5 ? 'display: none;' : ''}>
        <h2>Why can’t I see my post on the map?</h2>
        <div class="overlay__section-text">
          <p>
            In almost all cases, your post is waiting in our moderation queue.
            All submissions are reviewed by a small team before appearing
            publicly, to ensure they meet our community guidelines. Thank you
            for your patience — your story matters and will be visible soon.
          </p>
        </div>

        <h2>Can I delete my post?</h2>
        <div class="overlay__section-text">
          <p>
            Yes, of course! If you'd like to remove a post you submitted, please
            email the text of the post to
            <a href="mailto:info@peoplesriverhistory.org"
              >info@peoplesriverhistory.org</a
            >
            with the subject line "Delete My Post."
          </p>
        </div>

        <h2>Can I edit or update my post after submitting it?</h2>
        <div class="overlay__section-text">
          <p>
            At this time, we are not able to edit submissions after they are
            posted. If you would like to update or correct something, please
            email us at
            <a href="mailto:info@peoplesriverhistory.org"
              >info@peoplesriverhistory.org</a
            >, and we can remove your post so you can resubmit.
          </p>
        </div>

        <h2>How can I become a moderator?</h2>
        <div class="overlay__section-text">
          <p>
            While our volume of submissions is modest, we occasionally welcome
            help. If you're interested in volunteering, please reach out to
            <a href="mailto:info@peoplesriverhistory.org"
              >info@peoplesriverhistory.org</a
            >.
          </p>
        </div>

        <h2>What kinds of stories are you looking for?</h2>
        <div class="overlay__section-text">
          <p>
            We welcome memories, oral histories, reflections, and experiences
            that connect to rivers. Stories of migration, labor, play,
            environmental change, displacement, or simply moments of quiet
            connection to waterways are all important. Both recent and
            historical memories are deeply valued.
          </p>
        </div>

        <h2>Can I post a story about my family or historical figures?</h2>
        <div class="overlay__section-text">
          <p>
            We strongly believe that people's history told from below is at
            least as important as stories about historical luminaries. We are
            most interested in the histories to which you have a personal and
            emotional connection — the ways rivers have shaped your family, your
            community, and your lived experience.
          </p>
        </div>

        <h2>
          Can I post about difficult experiences, like racism, sexism, or
          environmental injustice?
        </h2>
        <div class="overlay__section-text">
          <p>
            Yes. We know that river life is complex and layered. We welcome
            honest storytelling about injustice, loss, struggle, and resilience,
            provided it is shared respectfully. Our moderation ensures safety
            but does not censor difficult truths.
          </p>
        </div>

        <h2>Who is behind People's River Stories?</h2>
        <div class="overlay__section-text">
          <p>
            This is a participatory project developed as part of
            <em>A Secret History of American River People</em>, a community
            storytelling and research initiative founded in 2014. You can learn
            more about the larger project at
            <a
              href="https://peoplesriverhistory.org"
              target="_blank"
              rel="noopener">peoplesriverhistory.org</a
            >.
            <i>People's River Stories</i> was created by new media artist Wes
            Modes, and adapted from the open-source platform
            <a href="https://queeringthemap.com" target="_blank" rel="noopener"
              >Queering the Map</a
            >, a groundbreaking project that expanded what community-driven,
            place-based storytelling on the web could be.
          </p>
        </div>

        <h2>What data does People's River Stories collect?</h2>
        <div class="overlay__section-text">
          <p>
            We only collect the story you write, the location you click on the
            map, and the time and date of your submission. We do not collect
            identifying information like your IP address or contact info.
          </p>
        </div>

        <h2>Can I use content from People's River Stories in my own work?</h2>
        <div class="overlay__section-text">
          <p>Yes, with some conditions!</p>
        </div>
        <div class="overlay__section-text">
          <p>
            People's River Stories content is licensed under the
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener"
            >
              Creative Commons Attribution-NonCommercial-ShareAlike 4.0
              International License
            </a>. This means you can share, adapt, and build upon the material
            for non-commercial purposes, as long as you:
          </p>

          <div class="partial_div-numbered">
            <span>1</span>Give appropriate credit to People's River Stories,
            link to the license, and indicate if changes were made.
          </div>
          <br />
          <div class="partial_div-numbered">
            <span>2</span>Do not use the material for commercial purposes.
          </div>
          <br />
          <div class="partial_div-numbered">
            <span>3</span>If you remix or build upon the content, share your
            contributions under the same license.
          </div>

          <p>
            If you have questions or are interested in collaborative work,
            please contact us at <a href="mailto:info@peoplesriverhistory.org"
              >info@peoplesriverhistory.org</a
            >.
          </p>
        </div>
      </section>

      <section style={active_tab !== 4 ? 'display: none;' : ''}>
        <h2 style="margin-bottom:0px;">Selected Press</h2>

        <div class="__press">
          <p>
            Selected press coverage of <em
              >A Secret History of American River People</em
            >, the larger project from which <i>People's River Stories</i> emerges.
          </p>

          <h2>Cabin Porn</h2>
          <a
            href="https://peoplesriverhistory.org/press/cabin-porn-shantyboat/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Rivers of North America: Shantyboat
          </a>
          <span>Contributed by Wes Modes, Zach Klein, Freda Moon</span>

          <h2>Atlas Obscura</h2>
          <a
            href="https://peoplesriverhistory.org/press/atlas-obscura-an-artist-a-shantyboat-and-the-lost-history-of-american-river-communities/"
            target="_blank"
            rel="noopener noreferrer"
          >
            An Artist, a Shantyboat, and the Lost History of American River
            Communities
          </a>
          <span>By Jonathan Carey</span>

          <h2>Pittsburgh Post-Gazette</h2>
          <a
            href="https://peoplesriverhistory.org/press/pittsburgh-post-gazette-shantyboat-trip-down-the-ohio-river-video/"
            target="_blank"
            rel="noopener noreferrer"
          >
            A Shantyboat Trip Down the Ohio
          </a>
          <span>Video by Andrew Rush</span>

          <h2>Pittsburgh Post-Gazette</h2>
          <a
            href="https://peoplesriverhistory.org/press/pittsburgh-post-gazette-california-artist-will-capture-life-on-the-ohio-river-in-a-homemade-shantyboat/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Capturing Life on the Ohio River in a Homemade Shantyboat
          </a>
          <span>By Christian Snyder</span>

          <h2>BBC Outlook</h2>
          <a
            href="https://peoplesriverhistory.org/field-reports/outlook-on-the-bbcs-world-service/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Building My Own ‘Shanty Boat’
          </a>
          <span>BBC World Service</span>

          <h2>BBC Radio 3 — Between the Ears</h2>
          <a
            href="https://peoplesriverhistory.org/field-reports/between-the-ears-on-bbc-radio-3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Shanty Boat
          </a>
          <span>BBC Radio 3</span>

          <h2>Fair Companies</h2>
          <a
            href="https://peoplesriverhistory.org/field-reports/fair-companies-how-shantyboats-down-the-mississippi-helped-build-a-culture/"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Shantyboats Down the Mississippi Helped Build a Culture
          </a>
          <span>By Fair Companies</span>

          <h2>UK Daily Mail</h2>
          <a
            href="https://peoplesriverhistory.org/press/uk-dailymail-could-you-live-on-a-shantyboat-artist-calls-this-tiny-homemade-floating-shack-home-as-he-journeys-around-the-tennessee-river/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Could You Live on a 'Shantyboat'? Artist Calls This Tiny Homemade
            Floating Shack Home
          </a>
          <span>Daily Mail UK</span>
        </div>
        <p>
          For the full archive, visit <a
            href="https://peoplesriverhistory.org/category/press/"
            target="_blank"
            rel="noopener noreferrer">peoplesriverhistory.org</a
          >.
        </p>
      </section>

      <section style={active_tab !== 6 ? 'display: none;' : ''}>
        <h2>Terms of Use</h2>
        <div class="privacy_policy overlay__section-text">
          <p><small>Last Updated on April 28, 2025</small></p>

          <h2>Summary</h2>

          <p>
            These are the conditions for using People's River Stories. We’ve
            kept things straightforward so you know how your stories are
            handled, what you’re agreeing to when you post, and what we expect
            from contributors.
          </p>

          <p>
            This summary doesn’t replace the full Terms of Use below, which we
            encourage you to read.
          </p>

          <ul>
            <li>
              By using People's River Stories, you agree to these Terms and our
              Privacy Policy. If you don’t agree, please don’t submit stories or
              use the site.
            </li>
            <li>
              We may update these Terms at any time. Please check back now and
              then.
            </li>
            <li>
              You own your stories. By submitting, you give us permission to
              publish, display, and adapt them for the project, always with
              credit to you if you choose to be credited.
            </li>
            <li>
              You can ask to have your story removed at any time by emailing
              <a href="mailto:info@peoplesriverhistory.org"
                >info@peoplesriverhistory.org</a
              >.
            </li>
            <li>
              Stories must not include hate speech, personal contact info, spam,
              impersonation, or break copyright laws.
            </li>
            <li>
              All site content is shared under a
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener"
              >
                Creative Commons Attribution-NonCommercial-ShareAlike 4.0
                License
              </a>.
            </li>
            <li>People's River Stories is intended for users 13 and older.</li>
            <li>
              We do our best to maintain the site, but can't guarantee it will
              always be available or error-free.
            </li>
          </ul>

          <h2>Full Terms</h2>

          <h3>1. Using People's River Stories</h3>
          <p>
            By accessing or posting on People's River Stories, you agree to
            these Terms. If you don’t agree, please do not use the site.
          </p>

          <h3>2. Changes to These Terms</h3>
          <p>
            We may update these Terms occasionally. When we do, the updated
            Terms are effective immediately. Your continued use of the site
            means you accept the new Terms.
          </p>

          <h3>3. Submitting Your Story</h3>
          <p>
            You retain ownership of any story you submit. By submitting, you
            grant People's River Stories a nonexclusive, worldwide license to
            publish, adapt, display, and share your story as part of the
            project, under the terms of the Creative Commons
            Attribution-NonCommercial-ShareAlike 4.0 license.
          </p>

          <p>
            You promise that you either own the rights to the content you submit
            or have permission to share it. If you don’t, please don’t post it.
          </p>

          <h3>4. Removing Your Story</h3>
          <p>
            If you would like your story removed, email
            <a href="mailto:info@peoplesriverhistory.org"
              >info@peoplesriverhistory.org</a
            >. We’ll take it down as soon as we reasonably can.
          </p>

          <h3>5. Content Guidelines</h3>
          <p>Submissions must not:</p>
          <ul class="voidcircle">
            <li>Include hate speech, threats, or harassment;</li>
            <li>Share personal contact information (yours or others');</li>
            <li>Infringe on copyrights, trademarks, or other rights;</li>
            <li>Contain spam, advertising, or commercial solicitations;</li>
            <li>Violate any law or encourage illegal activity.</li>
          </ul>

          <h3>6. License for Site Content</h3>
          <p>
            Unless noted otherwise, all content on People's River Stories is
            available under a
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener"
            >
              Creative Commons Attribution-NonCommercial-ShareAlike 4.0 License
            </a>. You are free to share and adapt content, as long as you credit
            the source, use it noncommercially, and share any new works under
            the same license.
          </p>

          <h3>7. Age Requirements</h3>
          <p>
            You must be at least 13 years old to use People's River Stories. If
            you’re under 18, you should have permission from a parent or
            guardian.
          </p>

          <h3>8. Availability and Responsibility</h3>
          <p>
            We do our best to keep People's River Stories available and secure,
            but cannot guarantee uninterrupted access, freedom from errors, or
            preservation of submitted content. We are not liable for damages if
            the site is unavailable or if data is lost.
          </p>

          <h3>9. Third-Party Links</h3>
          <p>
            We may occasionally link to other websites. We are not responsible
            for the content, security, or availability of those sites.
          </p>

          <h3>10. Contact</h3>
          <p>
            For questions about these Terms, email us at
            <a href="mailto:info@peoplesriverhistory.org"
              >info@peoplesriverhistory.org</a
            >.
          </p>
        </div>
      </section>

      <section style={active_tab !== 7 ? 'display: none;' : ''}>
        <h2>Privacy Policy</h2>
        <div class="privacy_policy overlay__section-text">
          <p><small>Last Updated on April 28, 2025</small></p>

          <p>
            This Privacy Policy explains what information we collect, how we use
            it, and how we protect it. People's River Stories is committed to
            respecting your privacy. By using this platform, you agree to this
            policy. If you don’t agree, please don’t use the site.
          </p>

          <h2>1. What We Collect</h2>

          <p>
            <strong>User Content:</strong>
            When you share a story, you voluntarily provide text that may include
            personal memories, reflections, or experiences.
          </p>

          <p>
            <strong>Location Data:</strong>
            You select a point on the map where you want your story to appear. We
            do not track your actual device location.
          </p>

          <p>
            <strong>Time of Submission:</strong>
            We record when a story is submitted so we can organize entries chronologically.
          </p>

          <h2>2. How We Use Information</h2>

          <p>
            We use the information you provide to display stories on the map, to
            maintain the archive, and to moderate submissions according to our
            community guidelines.
          </p>

          <p>
            We may also use aggregated, non-identifiable data to better
            understand usage patterns and to share the project's impact with
            funders, researchers, or the public.
          </p>

          <h2>3. Anonymity and Disclosure</h2>

          <p>
            People's River Stories is an anonymous platform. We do not collect
            names, email addresses, phone numbers, or account logins when you
            submit a story. We moderate submissions to help protect your
            anonymity and the privacy of others.
          </p>

          <p>We will not share submission data unless required by law.</p>

          <h2>4. Third-Party Services</h2>

          <p>
            People's River Stories uses external services for hosting and map
            display. These services have their own privacy practices which we do
            not control. We encourage users to review the privacy policies of
            any third-party services they interact with.
          </p>

          <h2>5. Security</h2>

          <p>
            We take reasonable steps to protect the data you submit. However, no
            system is completely secure, and we cannot guarantee the absolute
            security of information transmitted online.
          </p>

          <h2>6. Children's Privacy</h2>

          <p>
            People's River Stories is intended for users aged 13 and older. We
            do not knowingly collect information from children under 13.
          </p>

          <h2>7. Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted here and are effective immediately once published.
          </p>

          <h2>8. Contact Us</h2>

          <p>
            If you have questions or concerns about this Privacy Policy, email
            us at
            <a href="mailto:info@peoplesriverhistory.org"
              >info@peoplesriverhistory.org</a
            >.
          </p>
        </div>
      </section>

      <section style={active_tab !== 8 ? 'display: none;' : ''}>
        <h2>Contact</h2>
        <div class="overlay__section-text">
          <p>
            Get in touch at
            <a href="mailto:info@peoplesriverhistory.org"
              >info@peoplesriverhistory.org</a
            >.
          </p>
          <p>
            Follow us on
            <a
              href="https://www.instagram.com/peoplesriverhistory/"
              target="_blank"
              rel="noopener">Instagram</a
            >,
            <a
              href="https://www.facebook.com/peoplesriverhistory/"
              target="_blank"
              rel="noopener">Facebook</a
            >,
            <a
              href="https://www.youtube.com/@peoplesriverhistory"
              target="_blank"
              rel="noopener">YouTube</a
            >, and
            <a
              href="https://www.patreon.com/c/wmodes"
              target="_blank"
              rel="noopener">Patreon</a
            >.
          </p>
        </div>
      </section>
    </div>
    <div class="footer__menu__margin">
      <div class="info__tabs first__row">
        <button class:active={active_tab == 5} on:click={() => showTabState(5)}
          >FAQs
        </button>
        <button
          class:active={active_tab == 6}
          style="border-right: unset;"
          on:click={() => showTabState(6)}
          >Terms of Use
        </button>
      </div>
      <div class="info__tabs">
        <button class:active={active_tab == 7} on:click={() => showTabState(7)}
          >Privacy Policy
        </button>
        <button
          class:active={active_tab == 8}
          style="border-right: unset;"
          on:click={() => showTabState(8)}
          >Contact
        </button>
      </div>
    </div>
  </div>
</aside>

<style>
  a {
    cursor: pointer;
  }
  ul {
    list-style-type: disc;
    margin-top: -5px;

    padding-right: 1em;
  }
  ul.voidcircle li {
    margin-top: -5px;
    padding-bottom: 10px;
  }
  ul.voidcircle {
    padding-left: 3.5em;
    padding-right: 1.5em;
    list-style-type: circle;
  }
  /* .__press h2.divider {
    border-top: 1.01px solid var(--color-dark);
    padding-top: 1em;
    padding-left: 2.05rem;
    font-weight: bold !important;
  } */
  .__press {
    display: flex;
    flex-direction: column;
  }
  .__press span {
    padding-left: 10px;
    margin-top: 10px;
    display: none;
    /* hides press names */
  }
  .__press a {
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 0px;
    font-size: 15px;
  }
  .__press h2 {
    font-size: 15.1px;
    border-top: 0px;
    padding-top: 4px;
    padding-left: 1em;
    padding-bottom: 0px;
    margin-bottom: 0px;
    font-weight: 400 !important;
  }
  .footer__menu__margin {
    margin-top: 20px;
    width: calc((40vw));
    position: sticky;
    bottom: 0px;
    background: var(--color-base);
  }
  .header__menu__margin {
    width: calc((40% - 43px));
    left: 54px;
    position: fixed;
    background: var(--color-base);
  }

  .info__tabs {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;
  }
  .info__tabs button {
    width: 50%;
    border: 1.01px solid var(--color-dark);
    height: 22.5px;
    font-size: 0.9rem;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    color: var(--color-dark);
  }
  .info__tabs button.active {
    background-color: var(--color-dark);
    color: var(--color-base);
  }
  .info__tabs button:hover {
    background-color: black;
    color: var(--color-base);
    transition-duration: 300ms;
    transition-timing-function: ease;
  }
  .info__tabs button:nth-child(odd) {
    border-left: 0px solid black;
    border-right: unset;
  }

  .info__tabs.first__row button {
    border-bottom: 0px;
  }
  .partial_div-numbered {
    display: flex;
    gap: 8px;
  }
  .partial_div-numbered p {
    margin-top: 0px;
  }
  .partial_div-numbered span {
    border: 1.01px solid var(--color-dark);
    border-radius: 50%;
    min-width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .overlay {
    height: 100%;
    position: fixed;
    z-index: var(--overlay-z-index);
    top: 0;
    background-color: var(--color-base);
    overflow-x: hidden;
  }

  .overlay__outer section p {
    padding-left: 1em;
    padding-right: 1em;
  }
  .overlay__outer section ul p {
    padding-left: 0em;
    padding-right: 0em;
  }

  .overlay__outer section .donate_button {
    width: calc(100% - 2em);
    margin: auto;
    display: flex;
    justify-content: center;
  }

  section {
    margin-top: 2em;
  }

  h2 {
    text-decoration: none;
    font-size: 15px;
    color: var(--color-dark);
    display: block;
    font-weight: 500;
    padding-bottom: 4px;
    border-top: 1px solid var(--color-dark);
    padding-left: 2.05rem;
  }
  .overlay__content h2 {
    font-weight: bold;
    font-size: 15px;
  }
  @media (min-width: 800px) {
    h2 {
      font-size: 15px;
      padding-top: 1em;
    }
  }

  .overlay__section-text {
    text-decoration: none;
    color: var(--color-dark);
    display: block;
    margin-top: 1em;
    font-size: 15px;
  }

  .overlay__section-text > *:first-child {
    margin-top: 0;
  }

  .overlay__section-text > *:last-child {
    margin-bottom: 0;
  }

  a {
    text-decoration: underline;
    text-decoration-color: var(--color-dark);
    color: var(--color-dark);
  }

  a:not(.closebtn):hover,
  a:not(.closebtn):focus {
    color: var(--color-highlight);
    text-decoration-color: var(--color-highlight);
  }

  .overlay--info {
    left: 0;
    z-index: 99999;
  }
  .overlay--info::-webkit-scrollbar {
    display: none;
  }

  .overlay--info {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .overlay__outer {
    padding-top: 11px;
  }
  @media (max-width: 800px) {
    h2 {
      padding-top: 1.05em;
      padding-bottom: 0px;
    }
    .overlay--info {
      margin-top: 9px;
      margin-left: 9px;
      margin-right: 9px;
      max-height: 98vh;
      background: transparent;
      width: calc(100vw - 18px);
    }
    .overlay__outer {
      background: var(--color-base);
      border: 1.01px solid var(--color-dark);
      border-bottom: 0px;
    }
    .header__menu__margin {
      width: calc((100% - 63px));
      left: 54px;
    }
    .footer__menu__margin {
      width: 100%;
    }
  }

  @media (min-width: 800px) {
    .overlay__outer {
      width: calc(40vw);
      padding-top: 12px;
    }

    .overlay--info {
      left: 9px;
      top: 9px;
      border-right: var(--color-dark) solid 1px;
      border-left: var(--color-dark) solid 1px;
      box-shadow: 4px 0px 6px 0px rgba(0, 0, 0, 0.5);
      max-height: calc(100vh - 18px);
      height: unset;
    }

    .overlay__content {
      margin: 0;
      height: 125%;
    }
  }

  .donate_button {
    display: inline-block;
    border: 1.01px solid var(--color-dark);
    background: var(--color-base);
    color: var(--color-dark);
    box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    padding: 10px 0px;
    text-align: center;
    font-size: 30px;
    text-transform: uppercase;
    text-decoration: none;
    transition-property: color, border-color, background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
    width: 100%;
    text-transform: uppercase;
    font-size: 20px;
    text-decoration: none !important;
    min-width: calc(100% - 1.5em);
  }

  .button__fadein .donate_button:hover {
    background: var(--color-dark);
    color: var(--color-base) !important;
    transition-property: color, border-color, background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
    border: 1.01px solid var(--color-dark);
  }
</style>
