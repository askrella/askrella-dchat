const ImprintPage = () => {
	return (
		<div className="h-full bg-askrella-900">
			<div className="p-6">
				<h1 className="mb-6 text-3xl font-semibold text-white">Imprint</h1>
				<div className="text-white">
					<h2 className="mb-4 text-2xl font-semibold">Responsible for content according to § 5 TMG:</h2>
					<p className="mb-2">Askrella Software Agency UG (haftungsbeschränkt)</p>
					<p className="mb-2">Senefelderstr. 3</p>
					<p className="mb-2">71638 Ludwigsburg</p>
					<p className="mb-6">Germany</p>

					<h2 className="mb-4 text-2xl font-semibold">Contact:</h2>
					<p className="mb-2">Phone: +49 177 2686292</p>
					<p className="mb-6">E-Mail: kontakt@askrella.de</p>

					<h2 className="mb-4 text-2xl font-semibold">VAT ID:</h2>
					<p className="mb-6">VAT Identification Number: DE349197234</p>

					<h2 className="mb-4 text-2xl font-semibold">
						Responsible for content according to § 55 Abs. 2 RStV:
					</h2>
					<p className="mb-6">Stanislav Hetzel, Senefelderstr. 3, 71638 Ludwigsburg</p>

					<h2 className="mb-4 text-2xl font-semibold">Data Privacy:</h2>
					<p className="mb-4">
						This website uses the OpenAI API for certain functions. Your data will be processed in
						accordance with the OpenAI data usage policy. For more information, please visit:{" "}
						<a
							className="underline"
							href="https://openai.com/policies/api-data-usage-policies"
							target="_blank"
							rel="noreferrer noopener"
						>
							https://openai.com/policies/api-data-usage-policies
						</a>
					</p>
					<p className="mb-4">
						We take data privacy seriously and are committed to protecting your personal information. This
						data privacy disclaimer explains how we handle personal information when you use our
						decentralized e2e encrypted chat platform in accordance with German data protection laws.
					</p>
					<h3 className="mb-2 text-xl font-bold">Decentralized and Independent</h3>
					<p className="mb-4">
						Our platform is completely decentralized and independent, which means that we do not use any
						third-party services. Your messages and data are securely encrypted and distributed across a
						network of peers, ensuring that your privacy is protected at all times.
					</p>
					<h3 className="mb-2 text-xl font-bold">No Collection or Storage of Personal Information</h3>
					<p className="mb-4">
						As our platform is decentralized and independent, we do not collect, store or process any
						personal information. Your privacy is completely protected as we do not have access to any of
						your personal information. However, please note that as the data is decentralized and
						distributed across the network, it cannot be deleted.
					</p>
					<h3 className="mb-2 text-xl font-bold">Changes to this Data Privacy Disclaimer</h3>
					<p className="mb-4">
						We may update this data privacy disclaimer from time to time to reflect changes in our practices
						or legal requirements. We encourage you to review this data privacy disclaimer periodically to
						stay informed about how we handle personal information on our decentralized e2e encrypted chat
						platform.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ImprintPage;
