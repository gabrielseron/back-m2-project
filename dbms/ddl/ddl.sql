--
-- Base de données :  `challenge`
--

-- --------------------------------------------------------

--
-- Structure de la table `challenge`
--

USE challenge;

CREATE TABLE IF NOT EXISTS `challenge` (
  `id_challenge` int(11) NOT NULL,
  `id_promo` int(11) NOT NULL,
  `name_challenge` text NOT NULL,

);

-- --------------------------------------------------------

--
-- Structure de la table `exercise`
--

CREATE TABLE IF NOT EXISTS `exercise` (
  `id_exercise` int(11) NOT NULL,
  `name_exercise` text NOT NULL,
  `question_exercise` text NOT NULL,
  `request_exercise` text NOT NULL,
  `result_exercise` text NOT NULL,
  `points_exercise` int(11) NOT NULL,
  `order_exercise` int(11) NOT NULL,
  `id_challenge` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Structure de la table `promo`
--

CREATE TABLE IF NOT EXISTS `promo` (
  `id_promo` int(11) NOT NULL,
  `promo_name` text NOT NULL
);

-- --------------------------------------------------------

--
-- Structure de la table `results`
--

CREATE TABLE IF NOT EXISTS `results` (
  `id_challenge` int(11) NOT NULL,
  `result` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `password` text NOT NULL,
  `email` text NOT NULL,
  `id_user` int(11) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `verified_email` tinyint(1) NOT NULL,
  `id_promo` int(11) DEFAULT NULL,
  `refresh_token` text
);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `challenge`
--
ALTER TABLE `challenge`
  ADD PRIMARY KEY (`id_challenge`),
  ADD KEY `id_promo` (`id_promo`);

--
-- Index pour la table `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`id_exercise`),
  ADD KEY `id_challenge_ex` (`id_challenge`);

--
-- Index pour la table `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`id_promo`);

--
-- Index pour la table `results`
--
ALTER TABLE `results`
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_challenge` (`id_challenge`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_promo` (`id_promo`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `challenge`
--
ALTER TABLE `challenge`
  MODIFY `id_challenge` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id_exercise` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `promo`
--
ALTER TABLE `promo`
  MODIFY `id_promo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `challenge`
--
ALTER TABLE `challenge`
  ADD CONSTRAINT `challenge_ibfk_1` FOREIGN KEY (`id_promo`) REFERENCES `promo` (`id_promo`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `exercise`
--
ALTER TABLE `exercise`
  ADD CONSTRAINT `id_challenge_ex` FOREIGN KEY (`id_challenge`) REFERENCES `challenge` (`id_challenge`);

--
-- Contraintes pour la table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `id_challenge` FOREIGN KEY (`id_challenge`) REFERENCES `challenge` (`id_challenge`),
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `id_promo` FOREIGN KEY (`id_promo`) REFERENCES `promo` (`id_promo`) ON UPDATE CASCADE;
